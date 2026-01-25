# JAction

Chainable action framework for building sequential and parallel task pipelines with zero-allocation async execution.

## Overview

JAction is a fluent API for composing complex action sequences in Unity. It supports:

- **Chainable methods** - Build readable action pipelines
- **Delays and waits** - Time delays, frame delays, conditional waits
- **Loops** - Repeat patterns with conditions
- **Parallel execution** - Run multiple actions concurrently
- **Zero-allocation async** - Custom awaitable struct for GC-free async/await
- **Object pooling** - Automatic recycling of JAction instances

::: tip Preemptive Execution
JAction is **preemptive** - it can be interrupted or cancelled at any yield point (delays, waits, frame boundaries). However, **atomic operations within a `.Do()` callback cannot be preempted**. If your callback contains a blocking operation (e.g., synchronous I/O, infinite loop, or long computation), it will block the main thread until completion.

Always keep `.Do()` callbacks lightweight and non-blocking for responsive behavior.
:::

## Installation

### Via OpenUPM CLI

```bash
openupm add com.jasonxudeveloper.jengine.util
```

### Via Unity Package Manager

For manual installation through Unity's Package Manager, visit the [OpenUPM page](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/) and follow the instructions.

### Namespace

```csharp
using JEngine.Util;
```

## Quick Start

```csharp
// Basic async sequence (recommended)
using var action = await JAction.Create()
    .Do(static () => Debug.Log("Step 1"))
    .Delay(1f)
    .Do(static () => Debug.Log("Step 2"))
    .ExecuteAsync();

// With timeout
using var action2 = await JAction.Create()
    .Do(static () => Debug.Log("Hello"))
    .Delay(2f)
    .ExecuteAsync(timeout: 5f);
```

## Execution Methods

| Method | Description |
|--------|-------------|
| `.Execute(float timeout = 0)` | Execute synchronously (blocks main thread until complete) |
| `.ExecuteAsync(float timeout = 0)` | Execute asynchronously via PlayerLoop (recommended) |

::: danger Prefer ExecuteAsync() for Better Performance
**`Execute()` blocks the main thread by spinning in a while loop.** This causes:
- Frame drops and stuttering
- UI freezing during execution
- Input lag
- Potential ANR (Application Not Responding) on mobile

**Always use `ExecuteAsync()` unless you specifically need blocking behavior** (e.g., in unit tests or editor scripts).
:::

### Sync vs Async Comparison

```csharp
// BAD: Blocks main thread - causes 2 seconds of freeze!
using var action1 = JAction.Create()
    .Do(static () => Debug.Log("Start"))
    .Delay(2f)  // Spins for 2 seconds, blocking everything
    .Do(static () => Debug.Log("End"))
    .Execute();

// GOOD: Non-blocking - game continues running smoothly
using var action2 = await JAction.Create()
    .Do(static () => Debug.Log("Start"))
    .Delay(2f)  // Yields to PlayerLoop, no blocking
    .Do(static () => Debug.Log("End"))
    .ExecuteAsync();
```

### Auto-Dispose with `using`

`JAction` implements `IDisposable`, so you can use the `using` pattern with both `Execute()` and `ExecuteAsync()`:

```csharp
// Sync execution with auto-dispose
using var action1 = JAction.Create()
    .Do(static () => Debug.Log("Sync"))
    .Execute();

// Async execution with auto-dispose (recommended)
using var action2 = await JAction.Create()
    .Do(static () => Debug.Log("Async"))
    .Delay(1f)
    .ExecuteAsync();

// Both actions are automatically disposed and returned to pool
```

This is equivalent to manually calling `Dispose()` but safer and cleaner - disposal happens even if an exception occurs.

### Frame Delays

- **`ExecuteAsync()`**: `.DelayFrame()` waits for actual Unity frames
- **`Execute()`**: `.DelayFrame()` is converted to time-based delay (frames don't advance in blocking mode)

### Timeout Behavior

- `timeout = 0` means no timeout (wait indefinitely)
- When timeout is reached, execution stops and `OnCancel` callbacks are invoked

### Preemption Points

JAction checks for cancellation and timeout at these preemption points:
- Before and after each `.Delay()` / `.DelayFrame()`
- Each iteration of `.WaitUntil()` / `.WaitWhile()`
- Each iteration of `.Repeat*()` loops
- Between parallel actions

Code inside `.Do()` callbacks runs atomically and cannot be preempted mid-execution.

## Fluent API Reference

### Action Execution

| Method | Description |
|--------|-------------|
| `.Do(Action)` | Execute a synchronous action |
| `.Do(Action<T>, T)` | Execute action with state parameter (zero-allocation) |
| `.Do(Func<JActionAwaitable>)` | Execute an async action |
| `.Do(Func<T, JActionAwaitable>, T)` | Execute async action with state parameter |

### Delays

| Method | Description |
|--------|-------------|
| `.Delay(float)` | Wait for specified seconds |
| `.DelayFrame(int)` | Wait for specified number of frames |

### Conditional Waits

| Method | Description |
|--------|-------------|
| `.WaitUntil(Func<bool>)` | Wait until condition returns true |
| `.WaitUntil(Func<T, bool>, T)` | Wait until condition with state parameter |
| `.WaitWhile(Func<bool>)` | Wait while condition returns true |
| `.WaitWhile(Func<T, bool>, T)` | Wait while condition with state parameter |

### Loops

| Method | Description |
|--------|-------------|
| `.Repeat(Action, int, float)` | Repeat action N times with interval |
| `.Repeat(Action<T>, T, int, float)` | Repeat with state parameter |
| `.RepeatWhile(Action, Func<bool>, float, float)` | Repeat action while condition is true |
| `.RepeatWhile(Action<T>, Func<T,bool>, T, float, float)` | Repeat while with state parameter |
| `.RepeatUntil(Action, Func<bool>, float, float)` | Repeat action until condition becomes true |
| `.RepeatUntil(Action<T>, Func<T,bool>, T, float, float)` | Repeat until with state parameter |

### Parallel Mode

| Method | Description |
|--------|-------------|
| `.Parallel()` | Enable parallel execution for subsequent actions |

### Cancellation

| Method | Description |
|--------|-------------|
| `.OnCancel(Action)` | Register cancellation callback |
| `.OnCancel(Action<T>, T)` | Register cancellation callback with state parameter |

## Zero-Allocation State Overloads

Closures (lambdas that capture variables) cause heap allocation and GC pressure. JAction provides state overloads to avoid this.

### Why Closures Allocate

```csharp
// BAD: Closure captures 'player', causing allocation each call
Player player = GetPlayer();
JAction.Create()
    .Do(() => player.TakeDamage(10))  // Allocates!
    .Execute();
```

### Using State Overloads

```csharp
// GOOD: Static lambda + state parameter + using = zero allocation
Player player = GetPlayer();
using var action = JAction.Create()
    .Do(static (p) => p.TakeDamage(10), player)  // No closure allocation!
    .Execute();
// JAction returned to pool, no lingering allocation
```

::: warning Important Limitation
State overloads **ONLY work with reference types** (classes, arrays, etc.).

State overloads **DO NOT work with value types** (int, float, struct, bool, etc.) because value types are boxed when passed as generic parameters, which defeats the purpose of avoiding allocation.
:::

### Examples

```csharp
// Reference type - use state overload (zero allocation)
MyClass obj = new MyClass();
using var action1 = JAction.Create()
    .Do(static (o) => o.DoSomething(), obj)
    .Execute();

// Value type - state overload won't work correctly
int myValue = 42;
using var action2 = JAction.Create()
    .Do(static (v) => Debug.Log(v), myValue)  // DON'T DO THIS - value gets boxed
    .Execute();

// Value type - use closure instead
int myValue2 = 42;
using var action3 = JAction.Create()
    .Do(() => Debug.Log(myValue2))  // OK - closure is acceptable here
    .Execute();
```

### Methods with State Overloads

All these methods have zero-allocation state overloads:
- `Do<T>(Action<T>, T)`
- `Do<T>(Func<T, JActionAwaitable>, T)`
- `WaitUntil<T>(Func<T, bool>, T, float, float)`
- `WaitWhile<T>(Func<T, bool>, T, float, float)`
- `RepeatWhile<T>(Action<T>, Func<T, bool>, T, float, float)`
- `RepeatUntil<T>(Action<T>, Func<T, bool>, T, float, float)`
- `Repeat<T>(Action<T>, T, int, float)`
- `OnCancel<T>(Action<T>, T)`

## Zero-GC Async Execution

JAction provides truly zero-allocation async execution through custom awaitable types.

### Custom Awaitable Types

- **`JActionAwaitable`** - Custom awaitable struct (not Task/UniTask)
- **`JActionAwaiter`** - Custom awaiter struct

Both are **structs**, meaning no heap allocation when using async/await.

### Async Usage

```csharp
// Zero-GC async execution with auto-dispose
using var action = await JAction.Create()
    .Do(static () => Debug.Log("Start"))
    .Delay(1f)
    .Do(static () => Debug.Log("After 1 second"))
    .Delay(1f)
    .Do(static () => Debug.Log("Done"))
    .ExecuteAsync(timeout: 5f);
```

### Combining with State Overloads

For **true zero-allocation async execution**, combine `ExecuteAsync()` with state overloads:

```csharp
GameManager gm = GetGameManager();

using var action = await JAction.Create()
    .Do(static (g) => g.StartLoading(), gm)
    .WaitUntil(static (g) => g.IsLoaded, gm)
    .Do(static (g) => g.StartGame(), gm)
    .ExecuteAsync(timeout: 30f);
```

## Lifecycle Management

### Methods

| Method | Description |
|--------|-------------|
| `Cancel()` | Cancel current execution |
| `Reset()` | Reset JAction state for reuse |
| `Dispose()` | Return JAction instance to pool |

### Object Pooling

JAction instances are automatically pooled (max 32 instances) to reduce allocation:

```csharp
// Check pool status
int pooled = JAction.PooledCount;

// Clear pool if needed
JAction.ClearPool();
```

### Best Practice: Use `using` for Auto-Dispose

```csharp
// Recommended: using pattern ensures disposal even if exceptions occur
using var action = await JAction.Create()
    .Do(static () => Debug.Log("Work"))
    .Delay(1f)
    .ExecuteAsync();

// action is automatically disposed and returned to pool
```

Manual disposal (if not using `using`):

```csharp
var action = JAction.Create()
    .Do(static () => Debug.Log("Work"))
    .Delay(1f);

await action.ExecuteAsync();

// Must manually return to pool
action.Dispose();
```

## Practical Examples

### Loading Sequence

```csharp
LoadingUI ui = GetLoadingUI();

using var action = await JAction.Create()
    .Do(static (u) => u.Show(), ui)
    .Do(static (u) => u.SetProgress(0), ui)
    .Delay(0.5f)
    .Do(static (u) => u.SetProgress(0.3f), ui)
    .Delay(0.5f)
    .Do(static (u) => u.SetProgress(0.7f), ui)
    .Delay(0.5f)
    .Do(static (u) => u.SetProgress(1f), ui)
    .Delay(0.3f)
    .Do(static (u) => u.Hide(), ui)
    .ExecuteAsync();
```

### Retry Logic

```csharp
NetworkManager net = GetNetworkManager();

using var action = await JAction.Create()
    .RepeatUntil(
        static (n) => n.TryConnect(),   // action to repeat
        static (n) => n.IsConnected,    // stop when connected
        net,                            // state
        frequency: 1f                   // retry every 1 second
    )
    .Do(static (n) => n.OnConnected(), net)
    .OnCancel(static (n) => n.OnFailed(), net)
    .ExecuteAsync(timeout: 10f);
```

### Animation Sequence

```csharp
Transform target = GetTarget();

using var action = await JAction.Create()
    .Do(static (t) => t.localScale = Vector3.zero, target)
    .Do(static (t) => t.gameObject.SetActive(true), target)
    .Delay(0.1f)
    .Do(static (t) => t.localScale = Vector3.one * 1.2f, target)
    .Delay(0.1f)
    .Do(static (t) => t.localScale = Vector3.one, target)
    .ExecuteAsync();
```

## Best Practices

1. **Always prefer `ExecuteAsync()` over `Execute()`** - synchronous execution blocks the main thread by spinning, causing frame drops and UI freezes. Only use `Execute()` for unit tests or editor scripts.

2. **Use `static` lambdas with state parameters** for performance-critical code to avoid GC allocation

3. **Keep `.Do()` callbacks lightweight** - code inside callbacks runs atomically and cannot be preempted. Long-running or blocking operations will freeze the game.

4. **Use the `using` pattern** to automatically dispose and return JAction instances to the pool (e.g., `using var action = await ...ExecuteAsync()`)

5. **Set appropriate timeouts** to prevent infinite waits in production

6. **Remember: state overloads only work with reference types** - for value types, use closures or wrap in a class

# JObjectPool

Thread-safe generic object pool for efficient object reuse and reduced garbage collection.

## Overview

JObjectPool provides a high-performance, thread-safe object pooling solution for Unity. Key features:

- **Generic type support** - Pool any reference type
- **Thread-safe** - Lock-free CAS operations for concurrent access
- **Configurable callbacks** - Custom create, rent, and return behaviors
- **Shared pools** - Built-in shared pool instances per type
- **Prewarming** - Pre-allocate objects to avoid runtime allocation

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

## Creating a Pool

### Basic Constructor

```csharp
// Simple pool with default constructor
var pool = new JObjectPool<MyClass>();
```

### With Custom Callbacks

```csharp
var pool = new JObjectPool<Bullet>(
    createFunc: () => new Bullet(),           // Called when pool is empty
    onRent: bullet => bullet.Activate(),      // Called when renting
    onReturn: bullet => bullet.Deactivate()   // Called when returning
);
```

### Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `createFunc` | `Func<T>` | Factory function to create new instances (default: `Activator.CreateInstance<T>()`) |
| `onRent` | `Action<T>` | Callback when object is rented from pool |
| `onReturn` | `Action<T>` | Callback when object is returned to pool |

## Core API

### Rent

Get an object from the pool. Creates a new instance if pool is empty.

```csharp
var bullet = pool.Rent();
```

### Return

Return an object to the pool for reuse.

```csharp
pool.Return(bullet);
```

### Clear

Remove all objects from the pool.

```csharp
pool.Clear();
```

### Prewarm

Pre-allocate objects to avoid runtime allocation spikes.

```csharp
// Pre-create 50 bullets
pool.Prewarm(50);
```

### Count

Get the current number of available objects in the pool.

```csharp
int available = pool.Count;
```

## Shared Pool

JObjectPool provides a shared pool instance per type for convenience:

```csharp
// Get from shared pool
var bullet = JObjectPool.Shared<Bullet>().Rent();

// Return to shared pool
JObjectPool.Shared<Bullet>().Return(bullet);
```

::: tip
Shared pools use default construction. For custom callbacks, create your own pool instance.
:::

## Thread Safety

JObjectPool uses lock-free CAS (Compare-And-Swap) operations for thread safety:

- Safe to call `Rent()` and `Return()` from multiple threads
- No locking overhead for high-performance scenarios
- Suitable for job system and async operations

```csharp
// Safe to use across threads
Parallel.For(0, 100, i =>
{
    var obj = pool.Rent();
    // ... use object
    pool.Return(obj);
});
```

## Usage Examples

### Bullet Pool

```csharp
public class BulletManager : MonoBehaviour
{
    private JObjectPool<Bullet> _bulletPool;

    void Awake()
    {
        _bulletPool = new JObjectPool<Bullet>(
            createFunc: () => {
                var bullet = new Bullet();
                bullet.Initialize();
                return bullet;
            },
            onRent: b => b.SetActive(true),
            onReturn: b => {
                b.SetActive(false);
                b.Reset();
            }
        );

        // Pre-allocate 100 bullets
        _bulletPool.Prewarm(100);
    }

    public Bullet SpawnBullet(Vector3 position)
    {
        var bullet = _bulletPool.Rent();
        bullet.Position = position;
        return bullet;
    }

    public void DespawnBullet(Bullet bullet)
    {
        _bulletPool.Return(bullet);
    }
}
```

### UI Element Recycling

```csharp
public class ItemListUI : MonoBehaviour
{
    private JObjectPool<ItemSlotUI> _slotPool;

    void Awake()
    {
        _slotPool = new JObjectPool<ItemSlotUI>(
            createFunc: () => Instantiate(_slotPrefab),
            onRent: slot => slot.gameObject.SetActive(true),
            onReturn: slot => {
                slot.Clear();
                slot.gameObject.SetActive(false);
            }
        );
    }

    public void PopulateList(List<Item> items)
    {
        // Return all existing slots
        foreach (var slot in _activeSlots)
            _slotPool.Return(slot);
        _activeSlots.Clear();

        // Rent slots for new items
        foreach (var item in items)
        {
            var slot = _slotPool.Rent();
            slot.SetItem(item);
            _activeSlots.Add(slot);
        }
    }
}
```

### Network Message Pool

```csharp
public static class MessagePool
{
    private static readonly JObjectPool<NetworkMessage> _pool =
        new JObjectPool<NetworkMessage>(
            onReturn: msg => msg.Clear()
        );

    public static NetworkMessage Rent() => _pool.Rent();
    public static void Return(NetworkMessage msg) => _pool.Return(msg);
}

// Usage
var msg = MessagePool.Rent();
msg.WriteInt(playerId);
msg.WriteString(action);
SendMessage(msg);
MessagePool.Return(msg);
```

## Best Practices

### 1. Prewarm During Loading

Pre-allocate objects during scene loading to avoid allocation spikes during gameplay:

```csharp
void OnSceneLoaded()
{
    _bulletPool.Prewarm(100);
    _particlePool.Prewarm(50);
    _audioPool.Prewarm(20);
}
```

### 2. Reset Objects on Return

Always reset object state when returning to prevent data leaks:

```csharp
var pool = new JObjectPool<Enemy>(
    onReturn: enemy => {
        enemy.Health = 0;
        enemy.Target = null;
        enemy.State = EnemyState.None;
    }
);
```

### 3. Size Pools Appropriately

Monitor pool usage and adjust prewarming:

```csharp
// Log pool stats periodically
Debug.Log($"Pool count: {pool.Count}");
```

### 4. Use Shared Pools for Simple Cases

For simple value objects without special initialization:

```csharp
// Simple use case - shared pool is fine
var list = JObjectPool.Shared<List<int>>().Rent();
list.Clear();
// ... use list
JObjectPool.Shared<List<int>>().Return(list);
```

### 5. Create Custom Pools for Complex Objects

For objects requiring specific initialization or cleanup:

```csharp
// Complex use case - custom pool with callbacks
private readonly JObjectPool<ParticleSystem> _particlePool =
    new JObjectPool<ParticleSystem>(
        createFunc: CreateParticle,
        onRent: ps => ps.Play(),
        onReturn: ps => {
            ps.Stop();
            ps.Clear();
        }
    );
```

## Comparison with Unity's ObjectPool

| Feature | JObjectPool | Unity ObjectPool |
|---------|-------------|-----------------|
| Thread-safe | Yes (lock-free) | Yes (with locks) |
| Generic | Yes | Yes |
| Shared pools | Built-in | Manual |
| Callbacks | Create, Rent, Return | Create, Get, Release, Destroy |
| Max size | Unlimited | Configurable |
| Namespace | JEngine.Util | UnityEngine.Pool |

JObjectPool is optimized for high-frequency operations with lock-free implementation, making it suitable for game scenarios with frequent object creation/destruction.

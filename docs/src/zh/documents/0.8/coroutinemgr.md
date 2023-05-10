# CoroutineMgr

CoroutinetMgr是在JEngine热更工程使用Unity协程的助手（针对非继承MonoBehaviour使用协程的助手）

[[toc]]

## 前言
下面提到的成员/函数都是在`CoroutineMgr`类下的，这个类型是个单例类型，但是需要使用`CoroutineMgr.Instance.XXX`。

## 启动协程
```csharp
Coroutine StartCoroutine(IEnumerator enumerator)
```

`enumerator`，迭代器，通过传入一个迭代器来启动协程，与Unity自身的StartCoroutine一致

该方法会返回一个协程对象，可以保留着，用于取消协程



## 停止协程

```csharp
StopCoroutine(IEnumerator enumerator)
```

```csharp
StopCoroutine(Coroutine coroutine)
```

`enumerator`，创建协程时传入的迭代器对象

`coroutine`，创建协程时返回的协程对象



## 停止全部协程

> 该方法仅可以停止全部使用CoroutineMgr启动的协程

```csharp
StopAllCoroutines()
```


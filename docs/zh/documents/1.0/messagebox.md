# 弹窗提示框

JEngine 提供了一个简洁实用的弹窗提示框（MessageBox）系统，支持异步操作和对象池优化。

## 基本使用

### 显示确认对话框
```csharp
// 显示确认对话框，等待用户选择
bool result = await MessageBox.Show("确认", "是否删除该文件？");
if (result)
{
    Debug.Log("用户点击了确认");
}
else
{
    Debug.Log("用户点击了取消");
}
```

### 自定义按钮文本
```csharp
// 自定义确认和取消按钮的文本
bool result = await MessageBox.Show("保存", "是否保存当前修改？", "保存", "放弃");
if (result)
{
    Debug.Log("用户选择保存");
}
```

### 只显示确认按钮
```csharp
// 只显示确认按钮（省略取消按钮文本）
bool result = await MessageBox.Show("提示", "操作完成！", "确定");
// 返回值始终为 true，因为只有一个按钮
```

## 完整 API

### Show 方法
```csharp
public static UniTask<bool> Show(string title, string content, string ok = "OK", string no = "Cancel")
```

**参数说明：**
- `title` - 弹窗标题
- `content` - 弹窗内容
- `ok` - 确认按钮文本（默认 "OK"）
- `no` - 取消按钮文本（默认 "Cancel"，如果为空则只显示确认按钮）

**返回值：**
- `UniTask<bool>` - 用户点击确认返回 `true`，点击取消返回 `false`

## 管理方法

### 关闭所有弹窗
```csharp
// 强制关闭所有当前显示的弹窗
MessageBox.CloseAll();
```

### 清理资源
```csharp
// 清理所有弹窗实例和对象池
MessageBox.Dispose();
```

## 状态查询

### 获取活跃数量
```csharp
// 获取当前显示的弹窗数量
int activeCount = MessageBox.ActiveCount;
Debug.Log($"当前有 {activeCount} 个弹窗正在显示");
```

### 获取池化数量
```csharp
// 获取对象池中的弹窗数量
int pooledCount = MessageBox.PooledCount;
Debug.Log($"对象池中有 {pooledCount} 个弹窗实例");
```

## 使用示例

### 删除确认
```csharp
public async void DeleteFile()
{
    bool confirmed = await MessageBox.Show("删除确认", "确定要删除这个文件吗？", "删除", "取消");
    if (confirmed)
    {
        // 执行删除操作
        File.Delete(filePath);
        Debug.Log("文件已删除");
    }
}
```

### 操作完成提示
```csharp
public async void ShowSuccessMessage()
{
    // 只显示确认按钮的提示
    await MessageBox.Show("成功", "操作已完成！", "确定");
    // 继续后续操作
    Debug.Log("用户已确认");
}
```

### 批量操作确认
```csharp
public async void ProcessMultipleItems()
{
    for (int i = 0; i < items.Count; i++)
    {
        bool shouldContinue = await MessageBox.Show(
            "处理确认",
            $"是否处理第 {i + 1} 个项目？",
            "处理",
            "跳过"
        );

        if (shouldContinue)
        {
            ProcessItem(items[i]);
        }
    }
}
```

## 最佳实践

### 性能优化
- MessageBox 使用对象池系统，自动复用实例以提高性能
- 无需手动管理弹窗的生命周期，系统会自动处理

### 用户体验
- 为重要操作提供确认对话框
- 使用清晰明确的按钮文本
- 避免频繁弹窗打扰用户体验

### 异步处理
```csharp
// 推荐：使用 async/await 处理用户选择
public async void HandleUserChoice()
{
    bool result = await MessageBox.Show("确认", "继续操作？");
    if (result)
    {
        // 处理确认逻辑
    }
}

// 不推荐：阻塞主线程
public void HandleUserChoiceBlocking()
{
    var task = MessageBox.Show("确认", "继续操作？");
    bool result = task.GetAwaiter().GetResult(); // 可能导致卡顿
}
```

## 注意事项

- MessageBox 基于 UniTask，确保项目中已正确配置 UniTask
- 弹窗显示期间会阻止用户与其他 UI 交互
- 同时可以显示多个弹窗，但建议通过逻辑控制避免重叠显示
- 弹窗的视觉样式由 Unity UI 预制体控制，可通过修改预制体自定义外观
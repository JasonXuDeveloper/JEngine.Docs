# MessageBox

JEngine provides a simple and practical MessageBox system that supports asynchronous operations and object pooling optimization.

## Basic Usage

### Show Confirmation Dialog
```csharp
// Show confirmation dialog and wait for user choice
bool result = await MessageBox.Show("Confirm", "Do you want to delete this file?");
if (result)
{
    Debug.Log("User clicked confirm");
}
else
{
    Debug.Log("User clicked cancel");
}
```

### Custom Button Text
```csharp
// Customize confirm and cancel button text
bool result = await MessageBox.Show("Save", "Save current changes?", "Save", "Discard");
if (result)
{
    Debug.Log("User chose to save");
}
```

### Show Only Confirm Button
```csharp
// Show only confirm button (omit cancel button text)
bool result = await MessageBox.Show("Notice", "Operation completed!", "OK");
// Return value is always true since there's only one button
```

## Complete API

### Show Method
```csharp
public static UniTask<bool> Show(string title, string content, string ok = "OK", string no = "Cancel")
```

**Parameters:**
- `title` - MessageBox title
- `content` - MessageBox content
- `ok` - Confirm button text (default "OK")
- `no` - Cancel button text (default "Cancel", if empty only show confirm button)

**Return Value:**
- `UniTask<bool>` - Returns `true` if user clicks confirm, `false` if user clicks cancel

## Management Methods

### Close All MessageBoxes
```csharp
// Force close all currently displayed message boxes
MessageBox.CloseAll();
```

### Dispose Resources
```csharp
// Clean up all message box instances and object pool
MessageBox.Dispose();
```

## Status Query

### Get Active Count
```csharp
// Get the number of currently displayed message boxes
int activeCount = MessageBox.ActiveCount;
Debug.Log($"Currently {activeCount} message boxes are displayed");
```

### Get Pooled Count
```csharp
// Get the number of message boxes in object pool
int pooledCount = MessageBox.PooledCount;
Debug.Log($"There are {pooledCount} message box instances in the pool");
```

## Usage Examples

### Delete Confirmation
```csharp
public async void DeleteFile()
{
    bool confirmed = await MessageBox.Show("Delete Confirmation", "Are you sure you want to delete this file?", "Delete", "Cancel");
    if (confirmed)
    {
        // Execute delete operation
        File.Delete(filePath);
        Debug.Log("File deleted");
    }
}
```

### Operation Complete Notice
```csharp
public async void ShowSuccessMessage()
{
    // Show notice with only confirm button
    await MessageBox.Show("Success", "Operation completed!", "OK");
    // Continue subsequent operations
    Debug.Log("User acknowledged");
}
```

### Batch Operation Confirmation
```csharp
public async void ProcessMultipleItems()
{
    for (int i = 0; i < items.Count; i++)
    {
        bool shouldContinue = await MessageBox.Show(
            "Process Confirmation",
            $"Process item {i + 1}?",
            "Process",
            "Skip"
        );

        if (shouldContinue)
        {
            ProcessItem(items[i]);
        }
    }
}
```

## Best Practices

### Performance Optimization
- MessageBox uses object pooling system to automatically reuse instances for better performance
- No need to manually manage message box lifecycle, the system handles it automatically

### User Experience
- Provide confirmation dialogs for important operations
- Use clear and explicit button text
- Avoid frequent popups that interrupt user experience

### Asynchronous Handling
```csharp
// Recommended: Use async/await to handle user choices
public async void HandleUserChoice()
{
    bool result = await MessageBox.Show("Confirm", "Continue operation?");
    if (result)
    {
        // Handle confirmation logic
    }
}

// Not recommended: Blocking main thread
public void HandleUserChoiceBlocking()
{
    var task = MessageBox.Show("Confirm", "Continue operation?");
    bool result = task.GetAwaiter().GetResult(); // May cause lag
}
```

## Important Notes

- MessageBox is based on UniTask, ensure UniTask is properly configured in your project
- MessageBox prevents user interaction with other UI while displayed
- Multiple message boxes can be displayed simultaneously, but it's recommended to control this through logic to avoid overlapping
- MessageBox visual style is controlled by Unity UI prefabs, which can be customized by modifying the prefab
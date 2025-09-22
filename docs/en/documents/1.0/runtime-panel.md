# Runtime Panel

The runtime panel is JEngine's core configuration interface, accessed through the `Bootstrap` object's Inspector panel.

## Accessing the Panel

1. Open the `Init` scene
2. Select the `Bootstrap` object in the Hierarchy
3. View and configure various settings in the Inspector

## Development Settings

### Editor Mode
Switch between different runtime modes:
- **Editor Dev Mode (Red)** - Editor development mode, directly uses local hot update resources without downloading
- **Host Play Mode (Green)** - Host play mode, downloads hot update resources from server

**Use Cases**:
- Use Editor Dev Mode during development and debugging for improved efficiency
- Use Host Play Mode for testing and release to simulate real environment

## Server Settings

### Default Host Server
Set the primary download address for hot update resources:
- **Format**: `https://cdn.domain.com` or `http://127.0.0.1`
- **Note**: Do not include platform and package paths, the system will automatically append them
- **Subdirectory**: If resources are in a subdirectory, include the full path, e.g., `https://cdn.domain.com/games`

### Enable Fallback Host Server
Toggle option to enable fallback server configuration.

### Fallback Host Server
Backup server address that automatically switches when the primary server connection fails:
- Only visible when fallback server is enabled
- Provides redundancy protection to improve resource download success rate

## Asset Settings

### Target Platform
Select the target platform for application runtime:
- **Regular** - Standard platforms (iOS, Android, Windows, MacOS, WebGL)
- **WeChat** - WeChat Mini Game platform
- **Douyin** - Douyin Mini Game platform
- **Alipay** - Alipay Mini Game platform
- **TapTap** - TapTap Mini Game platform

### Package Name
Main hot update package name:
- Default is `main`
- Must match the package name built in the editor panel
- Dropdown list automatically detects available packages in the project

### Hot Update Assemblies
Assembly list file for hot update code:
- Used to specify which assemblies need hot updates
- Usually uses default configuration

### Hot Update Scenes
Configuration file for hot update scenes:
- Defines which scenes belong to hot update resources
- Associated with YooAsset configuration

### Hot Update Classes
Configuration information for hot update classes:
- Specifies entry class in hot update code
- Defaults to `EntryPoint` class

### Hot Update Methods
Configuration for hot update methods:
- Defines entry method for hot update code
- Works with hot update classes

### AOT DLL List
AOT (Ahead-of-Time) compiled DLL list file:
- Used for HybridCLR AOT generic supplementation
- Ensures hot update code can correctly call generic methods from main project

## Security Settings

### Dynamic Secret Key
Dynamic decryption key file for hot update resources:
- Used to decrypt dynamic keys in hot update resources
- Usually located in `Assets/HotUpdate/Obfuz/` directory

### Encryption Option
Select resource decryption method, must match the encryption method used during editor panel packaging:
- **Xor** - XOR decryption (recommended, fast)
- **Aes** - AES decryption (high security)
- **ChaCha20** - ChaCha20 decryption (highest security)

### Manifest Config
Configuration object for resource manifest:
- Automatically reads corresponding configuration files from `Resources/EncryptConfigs/` directory based on selected encryption mode
- Manages version information and encryption parameters for resource packages
- Usually no manual modification needed, system automatically selects based on Encryption Option

### Bundle Config
Configuration object for resource bundles:
- Automatically reads corresponding configuration files from `Resources/EncryptConfigs/` directory based on selected encryption mode
- Defines loading, caching and decryption strategies for resource packages
- Associated with encryption key configuration for selected encryption mode

## UI Settings

The Init scene already has default UI components configured, usually no modification needed. If you need to customize the interface, you can adjust these fields:

### Version Text
UI text component that displays current version information to users.

### Update Status Text
UI text component that displays hot update status, showing information like "Checking for updates...", "Downloading...".

### Download Progress Bar
UI component that displays resource download progress in real-time.

### Start Button
UI button that starts the hot update process when user clicks.

## Runtime Flow

### Development Mode Flow
1. Set Editor Mode to **Editor Dev Mode**
2. Run the game
3. System directly loads resources from local `Assets/HotUpdate/` directory
4. No network connection required, quickly enters hot update scene

### Release Mode Flow
1. Set Editor Mode to **Host Play Mode**
2. Configure Default Host Server (required)
3. Set correct Encryption Option (consistent with packaging)
4. Select corresponding Target Platform
5. Run the game
6. System automatically checks version, downloads and loads hot update resources

## Best Practices

### Development Phase
1. Use Editor Dev Mode for rapid iteration
2. Regularly switch to Host Play Mode to test complete workflow
3. Use local server for network functionality testing

### Testing Phase
1. Configure encryption options same as production environment
2. Test fallback server switching functionality
3. Verify resource loading on different platforms

### Production Release
1. Ensure server address is configured correctly
2. Enable appropriate level of encryption protection
3. Configure fallback server to improve reliability
4. Set up user-friendly UI feedback

## Common Issues

### Q: Resource download failed, what to do?
**A:** Check the following items:
- Whether server address is correct and accessible
- Whether resources have been correctly uploaded to server
- Whether encryption mode matches the packaging settings
- Whether network connection is stable
- Whether Package Name matches the package name on server

### Q: What's the difference between Editor Dev Mode and Host Play Mode?
**A:**
- **Editor Dev Mode**: Directly uses local resources, no network download, suitable for development debugging
- **Host Play Mode**: Downloads resources from server, simulates real runtime environment, suitable for testing and release

### Q: How to configure fallback server?
**A:**
1. Check "Enable Fallback Host Server"
2. Enter backup server address in the displayed "Fallback Host Server" field
3. Ensure resources on backup server stay synchronized with main server

### Q: Do mini game platforms require special configuration?
**A:**
- Select corresponding Target Platform (WeChat/Douyin/Alipay/TapTap)
- Pay attention to each platform's limitations on resource size and network requests
- Some platforms may require special domain whitelist configuration

## Important Notes

- Server address should not end with `/`
- Encryption option must match the editor panel packaging settings
- Package Name must exactly match the package name deployed on server
- Mini game platforms have special resource loading limitations and security requirements
- UI component configuration is optional, but recommended for better user experience
- Dynamic key file path must be correct, otherwise decryption may fail
# Editor Panel

JEngine provides an editor panel for managing hot update resource building and packaging.

## Opening the Panel

In the Unity editor's top menu bar, click `JEngine/JEngine Panel` to open the editor panel.

## Panel Field Settings

### JEngine Settings
**(Located at the top of the panel, first rendered group)**

#### Startup Scene Settings
- **Startup Scene** - Dropdown selection box to set the project's initialization scene
- **Jump to Start up Scene** - Toggle button to control automatic jump to startup scene

**Function Description**:
- When `Jump to Start up Scene` is enabled, running a non-initialization scene in Unity development environment will automatically jump to the specified startup scene
- After jumping, it will go through the complete hot update process: load hot update code → enter hot update scene → call hot update code
- This feature facilitates quick testing of hot update workflow during development without having to start from the initialization scene every time

### Package Settings

#### Package Name
Dropdown selection box to choose the hot update resource package to build:
- **main** - Main package (contains hot update code)
- **AddOn1** - Example package 1 (JEngine provided example, can be deleted)
- **Raw** - Example raw resource package (JEngine provided example, can be deleted)
- **Other custom packages** - Users can create their own packages as needed

#### Build Target
- Shows current build platform
- Click `Set to Current Active Target` button to automatically set to current active platform
- Supported platforms: Android, iOS, Windows, MacOS, WebGL, etc.

### Build Options

#### Encryption Mode
Dropdown selection box to choose hot update resource encryption method:
- **XOR** - XOR encryption (recommended, fast)
- **AES** - AES encryption (high security)
- **ChaCha20** - ChaCha20 encryption (highest security)

### Hot Update Scenes
- Shows scene list in `Assets/HotUpdate/Scenes` directory
- Supports pagination browsing
- Double-click scenes to quickly open in Unity

## Build Buttons

### Build All Hot Update Res (Code + Assets)
**When to click**:
- When hot update code is modified
- When Obfuz configuration is modified
- When building main package for the first time

**What happens after clicking**:
1. Compile hot update code (`Assets/HotUpdate/Code`)
2. Generate AOT generic supplement DLL
3. Apply code obfuscation (if Obfuz is enabled)
4. Package hot update resources into AssetBundles
5. Generate new version number

**Log displays**:
- Compilation progress information
- Obfuscation processing status
- Resource packaging progress
- Version number and output path upon completion

**Version Number Generation**:
- Format: Timestamp-based numeric version number (e.g., 24120115300)
- Algorithm: `(year-2000)*10000000 + month*100000 + day*1000 + hour*100 + minute*10 + second/6`
- Ensures unique version number for each build

### Build Hot Update Assets Only
**When to click**:
- When only hot update resources (scenes, prefabs, materials, etc.) are modified
- When code has no changes

**What happens after clicking**:
1. Analyze resource dependencies
2. Package changed resources into AssetBundles
3. Update resource version information

**Log displays**:
- Resource scanning progress
- Packaging processing status
- Version number and path upon completion

### Clean Built Packages
**When to click**:
- When encountering build issues and need to clear cache
- When preparing for a fresh build

**What happens after clicking**:
1. Delete build artifacts in `UnityProject/Bundles` directory
2. Clear temporary files from build process

**Log displays**: Detailed information about cleanup operations

## Build Status Monitoring

The panel provides real-time build status feedback:
- **Progress Bar**: Shows overall progress of current build
- **Status Label**: Shows specific step being executed
- **Log Area**: Shows detailed build process information, error hints, and success confirmations

## Output Results

After successful build, resources are output to:
```
UnityProject/Bundles/{Platform}/{PackageName}/{Version}/
```

Example:
```
UnityProject/Bundles/WebGL/main/1.0.0/
```

The panel displays complete output path and version information in the log, facilitating subsequent upload to CDN server.

## Resource Deployment

### Upload Path Structure
Deploy resources on server/CDN with the following structure:
```
https://cdn.domain.com/
├── WebGL/           # Platform directory
│   ├── main/        # Main package directory (required)
│   │   ├── PackageManifest_main.version
│   │   ├── PackageManifest_main.hash
│   │   └── [other resource files]
│   ├── AddOn1/      # Example package 1 directory (can be deleted)
│   │   ├── PackageManifest_AddOn1.version
│   │   └── [other resource files]
│   ├── Raw/         # Example raw resource package directory (can be deleted)
│   ├── MyFeature/   # User custom package example
│   └── DLC1/        # User custom package example
├── Android/         # Android platform
└── iOS/            # iOS platform
```

### Deployment Steps
1. After build completion, navigate to `UnityProject/Bundles/{Platform}/{Package}/{Version}/` directory
2. Copy all files from that version directory directly to the server's `{Platform}/{Package}/` directory
3. Example: Copy all files from `UnityProject/Bundles/WebGL/main/24120115300/` to `https://cdn.domain.com/WebGL/main/` directory
4. Ensure server address is configured correctly, e.g., `https://cdn.domain.com`
5. Note: server address should not include platform or package paths, the system will automatically append them

## Usage Workflow

1. Select package (usually choose `main`)
2. Click `Set to Current Active Target` to set platform
3. Choose appropriate encryption mode
4. Select corresponding build button based on modifications
5. Observe log to confirm successful build
6. Upload generated resources to server following the above path structure
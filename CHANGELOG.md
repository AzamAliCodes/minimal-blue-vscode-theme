# Changelog

All notable changes to the `Minimal Blue` extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-03-29

### 🎉 Stable Release

- **First official stable release of Minimal Blue on the VS Code Marketplace.**
- **No code changes** from `v0.0.3`. This release ensures **general availability** and marks the first production-ready version.
- If you are using **v0.0.3**, there is **no need to update**, as this version is identical.

### Added

- **Added `"publisher": "AzamAli"`** for publishing under the correct name.
- **Upgraded `"version"` to `1.0.1`** for the first major release.
- **Updated `"engines.vscode"` to `^1.75.0`** for compatibility with newer VS Code versions.
- **Updated README** with publisher details and the extension marketplace link.

## [0.0.3] - 2025-03-29

### Added

- Added new preview screenshots (`screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`, `screenshot-4.png`) in the `preview/` folder.
- Added theme interface preview (GIF & screenshots) in README for better visualization of the extension.
- Added logging statements throughout the extension for better debugging of its behavior.

### Fixed

- Fixed the issue where the sidebar would auto-close after clicking a file in the Explorer when the welcome page was open, ensuring the sidebar remains visible. This was resolved by removing all sidebar toggling logic, so the welcome page display no longer affects the sidebar state.
- Fixed the welcome page behavior to display only when no editors are open, without toggling the sidebar or causing unnecessary behavior, and ensured session restoration by not closing editors on startup.

### Changed

- Updated terminal settings to new values (`lineHeight: 1.3`, `fontSize: 14`) for a more compact terminal appearance (later reverted to `lineHeight: 1.5`, `fontSize: 16` in this version).
- Disabled font ligatures (`editor.fontLigatures: false`) for better readability.

### Regressions

- Reverted the terminal settings to their original values (`lineHeight: 1.5`, `fontSize: 16`), undoing the previous update for a more compact terminal appearance.

## [0.0.2] - 2025-03-26

### Added

- Added an extension logo to the `Minimal Blue` extension.

### Changed

- Improved UI for a distraction-free experience:
  - Hid the custom title bar.
  - Enabled auto-resizing of the centered layout to fit content.
  - Hid editor tabs, showing only the active file for a cleaner workspace.
  - Enabled single-click file opening in the Explorer for faster navigation.
- Enhanced readability:
  - Sorted files by type in the Explorer (e.g., .js before .json) for better organization.
  - Set JetBrains Mono as the default editor font for a minimalist look.
  - Increased the font size (`editor.suggestFontSize: 16`) and line height (`editor.suggestLineHeight: 30`) for code suggestions to improve clarity.
  - Improved terminal readability with a font size of 16 (`terminal.integrated.fontSize: 16`) and line height of 1.5 (`terminal.integrated.lineHeight: 1.5`).
- Refined welcome page behavior to appear only when no editors are open, enhancing the user experience.

## [0.0.1] - 2025-03-24

### Added

- Initial release of the `Minimal Blue` extension.
- Added the `Minimal Blue` theme for a clean, distraction-free dark color scheme.
- Added a custom welcome page (`vshome.svg`) that appears when no editors are open.
- Added force-applied settings for a minimal UI:
  - Hides the Activity Bar, Status Bar, layout control, Command Center, and tips for a focused workspace.
  - Toggles menu bar visibility and enables native full-screen mode.
  - Moves the sidebar to the right.
  - Disables breadcrumbs, Git decorations, and other UI elements for a cleaner look.
  - Sets Prettier as the default formatter with format-on-save enabled.
  - Configures typography settings (e.g., word wrap).
  - Force-applied Material Icon Theme as the default icon theme (`workbench.iconTheme: "material-icon-theme"`, `material-icon-theme.activeTheme: "material"`).
  - Refined workbench layout: hid default VS Code welcome page (`workbench.welcomePage.hidden: true`) and disabled startup editor (`workbench.startupEditor: "none"`).
  - Enhanced editor settings: configured minimap (`editor.minimap.renderCharacters: false`, `editor.minimap.scale: 1`, `editor.minimap.autohide: true`), disabled accessibility support (`editor.accessibilitySupport: "off"`), disabled empty selection clipboard (`editor.emptySelectionClipboard: false`), enabled mouse wheel zoom (`editor.mouseWheelZoom: true`), and configured scrollbars (`editor.scrollbar.horizontal: "auto"`, `editor.scrollbar.vertical: "auto"`, `editor.scrollbar.verticalScrollbarSize: 8`, `editor.scrollbar.horizontalScrollbarSize: 8`, `editor.scrollbar.scrollByPage: false`).
  - Improved file and Explorer settings: disabled compact folders (`explorer.compactFolders: false`), disabled delete confirmation (`explorer.confirmDelete: false`), hid Explorer badges (`explorer.decorations.badges: false`), enabled trimming of trailing whitespace (`files.trimTrailingWhitespace: true`) and final newlines (`files.trimFinalNewlines: true`).
  - Configured workbench tree: disabled sticky scroll (`workbench.tree.enableStickyScroll: false`), hid indent guides (`workbench.tree.renderIndentGuides: "none"`), and set indent to 8 pixels (`workbench.tree.indent: 8`).
  - Enabled word wrap in diff and chat editors (`diffEditor.wordWrap: "on"`, `chat.editor.wordWrap: "on"`).
- Added first run logic to skip the welcome page on the initial extension activation.
- Added theme monitoring to show/hide the welcome page based on whether the `Minimal Blue` theme is active.
- Added recommendations for Prettier and Material Icon Theme extensions.

[1.0.1]: https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/tag/v1.0.1
[0.0.3]: https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/tag/v0.0.3
[0.0.2]: https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/tag/v0.0.2
[0.0.1]: https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/tag/v0.0.1

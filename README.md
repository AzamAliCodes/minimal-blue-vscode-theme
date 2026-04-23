# MINIMAL BLUE 🌌 (THEME + UI)

Minimal Blue is a dark, minimalist theme for Visual Studio Code, designed to provide a **minimal, distraction-free UI** 🔧 as its core USP, with a sleek aesthetic. This theme removes unnecessary UI elements, applies curated settings for a **minimal UI** 🔧, and features a clean line highlight to keep you focused on your code. It also includes a custom welcome page for a personalized touch. ✨

> **Version 2.0.0 Update:** Now featuring **Minimal Blue (Super Dark)** as the default theme! The ultra-dark variant and all minimal settings are automatically applied the moment you install the extension. You can still manually switch back to the classic **Minimal Blue** variant if you prefer.

Now featuring **two variants**:
- **Minimal Blue**: The original dark, neon-inspired theme.
- **Minimal Blue (Super Dark)**: An even deeper, ultra-dark version for maximum focus.

---

## 💻 INTERFACE PREVIEW

### 📷 SCREENSHOTS

<p align="center"> <img src="preview/screenshot-1.png" width="49%" style="margin-right: 5px;"> <img src="preview/screenshot-2.png" width="49%"> </p> <p align="center">
<img src="preview/screenshot-3.png" width="49%" style="margin-right: 5px;"> <img src="preview/screenshot-4.png" width="49%"> </p>

- _A detailed view of the interface, including the code preview within the extension._

### 🎥 LIVE PREVIEW (GIF)

<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2h5NjlxOTlrMG1hd3FmaTc2NnFiOWRkc2ZseXRjMTVrNTdyOWhoaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WC0qwCBB2wReKwzzGA/giphy.gif" alt="Minimal Blue Preview" width="55%" />

- _Experience the extension in action with its clean, minimal interface._

---

## 🚀 INSTALLATION

### METHOD 1: INSTALL VIA VS CODE EXTENSIONS

1. Open VS Code.
2. Go to the Extensions view:
   * Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS).
3. Search for **Minimal Blue** in the search bar.
4. Click **Install**.
5. **Done!** The extension will automatically apply the theme and all recommended minimal UI settings.

### METHOD 2: MANUAL INSTALLATION VIA VSIX

#### OPTION 1: USING VS CODE UI

1. Open VS Code.
2. Go to the Extensions view:
   * Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS).
3. Click the `...` (menu button) in the top-right corner of the Extensions view.
4. Select **Install from VSIX...**.
5. Locate and select the `minimal-blue-2.0.0.vsix` file downloaded from the [GitHub Releases page](https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/latest).
6. Restart VS Code if necessary.

#### OPTION 2: USING THE TERMINAL

1. Download the `.vsix` file from the [GitHub Releases page](https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/latest).
2. Open your terminal.
3. Run the following command: [ Within command update the version of .vsix file downloaded ]
   ```bash
   code --install-extension minimal-blue-2.0.0.vsix
   ```
4. Restart VS Code if necessary.

---

## 🌟 FEATURES

* 🖥️ **Two Dark Variants**: Choose between the classic **Minimal Blue** or the new ultra-dark **Minimal Blue (Super Dark)**.
* 🖥️ **Minimal, Distraction-Free UI 🔧**: The core USP of Minimal Blue—hides unnecessary UI elements like the Activity Bar, Status Bar, and breadcrumbs for a clean, focused coding environment.
* ✨ **Shiny Line Highlight**: Features a highlight on the current line to keep your focus on the active code.
* 🎨 **Dark Minimal Theme**: A beautiful dark theme with a minimalist color palette.
* 📄 **Custom Adaptive Welcome Page**: Displays a welcome page (using `vshome.svg`) that automatically matches your theme variant. It appears when no editors are open, enhancing the **minimal UI** 🔧 experience.
* ⚙️ **Instant Recommended Settings**: Automatically applies settings for a **minimal UI** 🔧, now organized into categories and applied instantly on installation.
* 📦 **Extension Recommendations**: Suggests Material Icon Theme and Prettier for a complete setup.

---

## 🛠️ USAGE

### 📜 CUSTOM WELCOME PAGE

* The welcome page appears automatically when no editors are open and a "Minimal Blue" variant is active, complementing the **minimal UI** 🔧 design.
* To show it manually:
  * Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
  * Run **Minimal Blue: Show Welcome Page**.

### ⚙️ RECOMMENDED SETTINGS

The extension applies the following settings on first activation (if not already customized) to achieve a **minimal UI** 🔧. Technical Update: Settings are now organized into categories and only applied if the user hasn't customized them, ensuring a non-intrusive experience. 🔧

#### 🎨 THEME AND APPEARANCE
* Sets the theme to "Minimal Blue (Super Dark)" (can be manually changed to "Minimal Blue").
* Uses Material Icon Theme for icons.

#### 🖼️ WORKBENCH LAYOUT
* Moves the Activity Bar to the bottom to support a **minimal UI** 🔧.
* Hides the Status Bar to reduce visual clutter 🔧.
* Moves the Sidebar to the right.
* Hides editor tabs, showing only the active file for a cleaner look.
* Hides the default VS Code welcome page and Command Center to reduce clutter.
* Hides the custom title bar for a **distraction-free** look.
* Automatically resizes the centered layout to fit content.
* Toggles the menu bar (shows on Alt key press) for a **minimal UI** 🔧.

#### ✍️ EDITOR SETTINGS
* Disables minimap character rendering and enables autohide to keep the editor clean.
* Sets Prettier as the default formatter with format-on-save enabled.
* Disables accessibility support for performance.
* Enables word wrap so long lines automatically break to fit the editor width.
* **Shiny Line Highlight**: Enhances the active line highlight for better focus.

#### 📜 SCROLLBAR SETTINGS
* Auto-hides horizontal and vertical scrollbars (appears only when scrolling).
* Sets scrollbar thickness to 8 pixels for a comfortable and visible experience.
* Prevents clicking the scrollbar from scrolling a full page.

#### 📁 FILE AND EXPLORER SETTINGS
* Shows full folder structure in the Explorer.
* Disables delete confirmation prompts and badges to reduce distractions.
* Trims trailing whitespace and ensures final newlines in files.
* Sorts files by type (e.g., `.js` before `.json`) for better organization.

#### 🖋️ TYPOGRAPHY SETTINGS
* Sets the editor font to **JetBrains Mono** for a minimalist look. (If not installed, download and install from [JetBrains Mono](https://www.jetbrains.com/lp/mono/).)
* Disables font ligatures for better readability.
* Configures code suggestion font size to 16 and line height to 30 for better readability.
* Sets the terminal font size to 14 and line height to 1.3 for a comfortable experience.

#### 🔍 OTHER
* Disables breadcrumbs, Git decorations, and sticky scroll in the File Explorer to maintain a **minimal UI** 🔧.
* Enables word wrapping in the diff and chat editors.

---

## ⌨️ KEYBOARD SHORTCUTS

For a minimal experience, many UI elements are hidden to reduce distractions. Keyboard shortcuts allow you to access commands and navigate the interface quickly without relying on visible buttons. Click the arrow below to reveal the complete list of essential keyboard shortcuts:

<details>
  <summary><strong>❗Click here to view Keyboard Shortcuts</strong></summary>

| Function | Windows/Linux | macOS |
| :--- | :--- | :--- |
| Toggle Menu Bar (Reveals Menu Bar) | `Alt` | - |
| Quick Open File | `Ctrl+P` | `Cmd(⌘)+P` |
| Open Command Palette | `Ctrl+Shift+P` | `Cmd(⌘)+Shift+P` |
| Open Explorer | `Ctrl+Shift+E` | `Cmd(⌘)+Shift+E` |
| Open Extensions View | `Ctrl+Shift+X` | `Cmd(⌘)+Shift+X` |
| Search in Workspace | `Ctrl+Shift+F` | `Cmd(⌘)+Shift+F` |
| Find in File | `Ctrl+F` | `Cmd(⌘)+F` |
| Toggle Sidebar | `Ctrl+B` | `Cmd(⌘)+B` |
| Close Active Editor | `Ctrl+W` | `Cmd(⌘)+W` |
| Close All Editors | `Ctrl+K W` | `Cmd(⌘)+K W` |
| Split Editor | `Ctrl+\` | `Cmd(⌘)+\` |
| Toggle Terminal | `` Ctrl+` `` | `` Cmd(⌘)+` `` |
| Focus Editor Group 1 | `Ctrl+1` | `Cmd(⌘)+1` |
| Focus Editor Group 2 | `Ctrl+2` | `Cmd(⌘)+2` |
| Start Debugging | `F5` | `F5` |
| Stop Debugging | `Shift+F5` | `Shift+F5` |

</details>

---

## 📦 RECOMMENDED EXTENSIONS

* 🖼️ **Material Icon Theme** (`PKief.material-icon-theme`): Enhances file and folder icons.
* ✍️ **Prettier** (`esbenp.prettier-vscode`): Formats code automatically.

---

## 🌐 GITHUB REPOSITORY

* 📌 **GitHub Repository**: [AzamAliCodes/minimal-blue-vscode-theme](https://github.com/AzamAliCodes/minimal-blue-vscode-theme)
* 📌 **Check out other projects on GitHub**: [AzamAliCodes](https://github.com/AzamAliCodes)

## ⓘ EXTENSION LINK (VS CODE MARKETPLACE)

╰┈➤ [Minimal Blue Theme](https://marketplace.visualstudio.com/items?itemName=AzamAli.minimal-blue)

## 🔗 DOWNLOAD (.VSIX)

* 📦 [Download the latest release (.vsix)](https://github.com/AzamAliCodes/minimal-blue-vscode-theme/releases/latest)

---

## 📜 LICENSE

This extension is licensed under the [MIT License](LICENSE.md). 📄

---

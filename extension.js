const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

let welcomePanel = null;
let wasClosedByUser = false;

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log("Minimal Blue extension is now active!");

  // Apply recommended settings, overwriting any existing user settings
  const config = vscode.workspace.getConfiguration();
  const recommendedSettings = {
    // Theme and Appearance
    "workbench.colorTheme": "Minimal Blue (Super Dark)", // Sets the default theme to Minimal Blue (Super Dark)
    "workbench.iconTheme": "material-icon-theme", // Uses Material Icon Theme for icons
    "material-icon-theme.activeTheme": "material", // Configures Material Icon Theme to use the "material" variant

    // Workbench Layout
    "workbench.activityBar.location": "bottom", // Moves the Activity Bar to the bottom for a cleaner UI
    "workbench.sideBar.location": "right", // Moves the Sidebar to the right side of the window
    "workbench.statusBar.visible": false, // Hides the Status Bar for a minimal look
    "workbench.editor.showTabs": "none", // Hides editor tabs, showing only the active file
    "workbench.welcomePage.hidden": true, // Hides the default VS Code welcome page
    "workbench.startupEditor": "none", // Disables the default startup editor (e.g., welcome page)
    "workbench.layoutControl.enabled": false, // Disables the layout control buttons in the title bar
    "window.menuBarVisibility": "toggle", // Toggles the menu bar visibility (shows on Alt key press)
    "window.commandCenter": false, // Disables the Command Center in the title bar
    "window.nativeFullScreen": true, // Enables native full-screen mode for the window

    // Editor Settings
    "editor.minimap.renderCharacters": false, // Disables rendering characters in the minimap (shows blocks instead)
    "editor.minimap.scale": 1, // Sets the minimap scale to 1 (default size)
    "editor.minimap.autohide": true, // Automatically hides the minimap when not in use
    "editor.accessibilitySupport": "off", // Disables accessibility support for better performance
    "editor.emptySelectionClipboard": false, // Prevents copying empty selections to the clipboard
    "editor.defaultFormatter": "esbenp.prettier-vscode", // Sets Prettier as the default formatter
    "editor.formatOnSave": true, // Automatically formats files on save using Prettier
    "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }, // Sets Prettier as the formatter for JavaScript files
    "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }, // Sets Prettier as the formatter for TypeScript files
    "[html]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }, // Sets Prettier as the formatter for HTML files
    "editor.mouseWheelZoom": true, // Enable zooming the editor font using the mouse wheel + Ctrl
    "editor.wordWrap": "on", // Enables word wrap for all files, so long lines automatically break to fit the editor width

    // Editor Scrollbar Settings
    "editor.scrollbar.horizontal": "auto", // Auto-hide horizontal scrollbar (appears only when scrolling)
    "editor.scrollbar.vertical": "auto", // Auto-hide vertical scrollbar (appears only when scrolling)
    "editor.scrollbar.verticalScrollbarSize": 8, // Sets vertical scrollbar thickness to 8 pixels (comfortable & visible)
    "editor.scrollbar.horizontalScrollbarSize": 8, // Sets horizontal scrollbar thickness to 8 pixels (comfortable & visible)
    "editor.scrollbar.scrollByPage": false, // Prevents clicking the scrollbar from scrolling a full page

    // File and Explorer Settings
    "explorer.compactFolders": false, // Disables compact folder view in the Explorer (shows full folder structure)
    "explorer.confirmDelete": false, // Disables the confirmation prompt when deleting files in the Explorer
    "explorer.decorations.badges": false, // Hides badges (e.g., git status) in the Explorer
    "files.trimTrailingWhitespace": true, // Automatically trims trailing whitespace in files on save
    "files.trimFinalNewlines": true, // Ensures files end with a single newline on save
    "workbench.list.openMode": "singleClick", // Ensure single-click opens files in the Explorer
    "explorer.sortOrder": "type", // Sort files by type (e.g., .js before .json)

    // Workbench Tree (File Explorer) Settings
    "workbench.tree.enableStickyScroll": false, // Disables sticky scroll in the File Explorer tree
    "workbench.tree.renderIndentGuides": "none", // Hides indent guides in the File Explorer tree
    "workbench.tree.indent": 8, // Sets the indentation level in the File Explorer tree to 8 pixels
    "workbench.tips.enabled": false, // Disable shortcut tips on the VS Code welcome/home page
    "workbench.editor.centeredLayoutAutoResize": true, // Automatically resize the centered layout to fit content

    // Breadcrumbs and Navigation
    "breadcrumbs.enabled": false, // Disables breadcrumbs navigation at the top of the editor

    // Git Integration
    "git.decorations.enabled": false, // Disables Git decorations (e.g., inline change indicators) in the editor

    // Diff and Chat Editor
    "diffEditor.wordWrap": "on", // Enables word wrapping in the diff editor
    "chat.editor.wordWrap": "on", // Enables word wrapping in the chat editor (e.g., for GitHub Copilot chat)

    // Window Management
    "window.customTitleBarVisibility": "never", // Hide the custom title bar (if set to native, uses the OS default)

    // Typography settings
    "editor.fontFamily": "JetBrains Mono", // Set the default font family for the editor
    "editor.suggestFontSize": 16, // Set the font size for code suggestions
    "editor.suggestLineHeight": 30, // Set the line height for code suggestions
    "terminal.integrated.lineHeight": 1.3, // Set the line height in the integrated terminal
    "terminal.integrated.fontSize": 14, // Set the font size in the integrated terminal
    "editor.fontLigatures": false, // Disables font ligatures for better readability
  };

  /**
   * Applies the recommended settings to the global configuration.
   */
  async function applySettings(forceTheme = false) {
    for (const [key, value] of Object.entries(recommendedSettings)) {
      if (key === "workbench.colorTheme" && !forceTheme) continue;
      try {
        await config.update(key, value, vscode.ConfigurationTarget.Global);
      } catch (err) {
        console.error(`Failed to apply setting ${key}:`, err);
      }
    }
  }

  // Check if this is the first run of the extension
  const HAS_RUN_KEY = "minimalBlue.firstRunV2";
  const hasRunBefore = context.globalState.get(HAS_RUN_KEY, false);

  // If this is the FIRST run, force apply EVERYTHING immediately
  if (!hasRunBefore) {
    await applySettings(true);
    await context.globalState.update(HAS_RUN_KEY, true);
    // Use a small delay to ensure VS Code's UI is ready before showing the welcome page
    setTimeout(() => {
      vscode.commands.executeCommand("minimalBlue.showWelcome");
    }, 1000);
  }

  // Register the manual command
  context.subscriptions.push(
    vscode.commands.registerCommand("minimalBlue.showWelcome", () => showWelcomePage(context, false)),
    vscode.commands.registerCommand("minimalBlue.applySettings", () => applySettings(true))
  );

  // Monitor theme changes: if user switches back to Minimal Blue variants, re-sync settings
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration("workbench.colorTheme")) {
        const theme = vscode.workspace.getConfiguration().get("workbench.colorTheme");
        if (theme && (theme === "Minimal Blue" || theme === "Minimal Blue (Super Dark)")) {
          // User explicitly selected the theme, so we can suggest/apply settings
          await applySettings(false);
        }
      }
    })
  );

  // Startup check: if theme is active and no editors are open, show welcome page
  setTimeout(() => {
    const theme = vscode.workspace.getConfiguration().get("workbench.colorTheme");
    if (theme && (theme === "Minimal Blue" || theme === "Minimal Blue (Super Dark)") && vscode.window.visibleTextEditors.length === 0 && !wasClosedByUser) {
      showWelcomePage(context, true);
    }
  }, 1500);
}

function showWelcomePage(context, preserveFocus = true) {
  if (welcomePanel) {
    welcomePanel.reveal(vscode.ViewColumn.One, preserveFocus);
    return;
  }

  welcomePanel = vscode.window.createWebviewPanel(
    "minimalBlueWelcome",
    "Minimal Blue Welcome",
    { viewColumn: vscode.ViewColumn.One, preserveFocus: preserveFocus },
    { enableScripts: true, retainContextWhenHidden: true }
  );

  const svgPath = path.join(context.extensionPath, "vshome.svg");
  const svgContent = fs.existsSync(svgPath) ? fs.readFileSync(svgPath, "utf8") : "";

  welcomePanel.webview.html = `<html><body style="background:var(--vscode-editor-background, #051726);display:flex;justify-content:center;align-items:center;height:100vh;margin:0;overflow:hidden;">${svgContent}</body></html>`;
  welcomePanel.onDidDispose(() => {
    welcomePanel = null;
    wasClosedByUser = true;
  });
}

function deactivate() {
  if (welcomePanel) {
    welcomePanel.dispose();
  }
}

module.exports = { activate, deactivate };

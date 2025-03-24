const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Minimal BLue extension is now active!");

  // Apply recommended settings if they haven't been customized
  const config = vscode.workspace.getConfiguration();
  const recommendedSettings = {
    // Theme and Appearance
    "workbench.colorTheme": "Minimal BLue", // Sets the default theme to Minimal BLue
    "workbench.iconTheme": "material-icon-theme", // Uses Material Icon Theme for icons
    "material-icon-theme.activeTheme": "material", // Configures Material Icon Theme to use the "material" variant

    // Workbench Layout
    "workbench.activityBar.location": "hidden", // Hides the Activity Bar for a cleaner UI
    "workbench.sideBar.location": "right", // Moves the Sidebar to the right side of the window
    "workbench.statusBar.visible": false, // Hides the Status Bar for a minimal look
    "workbench.editor.showTabs": "single", // Shows only a single tab in the editor (hides tab bar if only one file is open)
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

    // Workbench Tree (File Explorer) Settings
    "workbench.tree.enableStickyScroll": false, // Disables sticky scroll in the File Explorer tree
    "workbench.tree.renderIndentGuides": "none", // Hides indent guides in the File Explorer tree
    "workbench.tree.indent": 8, // Sets the indentation level in the File Explorer tree to 8 pixels

    // Breadcrumbs and Navigation
    "breadcrumbs.enabled": false, // Disables breadcrumbs navigation at the top of the editor

    // Git Integration
    "git.decorations.enabled": false, // Disables Git decorations (e.g., inline change indicators) in the editor

    // Diff and Chat Editor
    "diffEditor.wordWrap": "on", // Enables word wrapping in the diff editor
    "chat.editor.wordWrap": "on", // Enables word wrapping in the chat editor (e.g., for GitHub Copilot chat)
  };

  // Apply the recommended settings if they haven't been customized by the user
  for (const [key, value] of Object.entries(recommendedSettings)) {
    const currentValue = config.inspect(key);
    if (!currentValue.globalValue && !currentValue.workspaceValue) {
      config.update(key, value, vscode.ConfigurationTarget.Global);
      console.log(`Applied setting: ${key} = ${JSON.stringify(value)}`);
    }
  }

  // Variable to hold the webview panel
  let welcomePanel = null;
  let hasOpenedOtherEditors = false;
  let wasClosedByUser = false;
  let isSidebarHidden = false; // Track whether we hid the sidebar

  // Check if this is the first run of the extension
  const HAS_RUN_KEY = "minimalBlue.hasRunBefore";
  let hasRunBefore = context.globalState.get(HAS_RUN_KEY, false);

  // If this is the first run, set the flag to true for subsequent runs
  if (!hasRunBefore) {
    context.globalState.update(HAS_RUN_KEY, true);
    console.log("First run of Minimal BLue, skipping welcome page.");
  }

  // Function to create or show the welcome page
  const showWelcomePage = (preserveFocus = true) => {
    console.log("Attempting to show Minimal BLue Welcome page...");

    // If the panel already exists, reveal it without taking focus (unless explicitly requested)
    if (welcomePanel) {
      console.log("Welcome panel already exists, revealing it.");
      welcomePanel.reveal(vscode.ViewColumn.One, preserveFocus);
      return;
    }

    // Hide the sidebar to make the welcome page appear full-screen
    if (!isSidebarHidden) {
      console.log("Hiding sidebar to show welcome page in full window.");
      vscode.commands.executeCommand(
        "workbench.action.toggleSidebarVisibility"
      );
      isSidebarHidden = true;
    }

    // Create a new webview panel
    console.log("Creating new webview panel for Minimal BLue Welcome.");
    welcomePanel = vscode.window.createWebviewPanel(
      "minimalBlueWelcome",
      "Minimal BLue Welcome",
      { viewColumn: vscode.ViewColumn.One, preserveFocus: preserveFocus },
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    // Load the SVG file from the extension directory
    const svgPath = path.join(context.extensionPath, "vshome.svg");
    let svgContent;
    try {
      svgContent = fs.readFileSync(svgPath, "utf8");
      console.log("Successfully loaded SVG content from vshome.svg");
    } catch (error) {
      console.error("Failed to load SVG content:", error);
      svgContent = `
        <svg width="100%" height="100%" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#051726"/>
          <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#87CEEB">Error: Could not load welcome SVG</text>
        </svg>
      `;
    }

    // Set the webview content with the SVG
    welcomePanel.webview.html = getWebviewContent(svgContent);

    // Handle when the panel is closed by the user
    welcomePanel.onDidDispose(
      () => {
        console.log("Welcome panel closed by user.");
        welcomePanel = null;
        wasClosedByUser = true;
        // Restore the sidebar if it was hidden
        if (isSidebarHidden) {
          console.log("Restoring sidebar visibility.");
          vscode.commands.executeCommand(
            "workbench.action.toggleSidebarVisibility"
          );
          isSidebarHidden = false;
        }
        // Only reopen if no editors are open and the user hasn't manually closed it
        if (vscode.window.visibleTextEditors.length === 0 && !wasClosedByUser) {
          console.log("No editors open, reopening welcome page.");
          showWelcomePage(true);
        }
      },
      null,
      context.subscriptions
    );
  };

  // Register the command to show the custom welcome page
  let disposableCommand = vscode.commands.registerCommand(
    "minimalBlue.showWelcome",
    () => {
      console.log("Minimal BLue: Show Welcome Page command triggered.");
      wasClosedByUser = false;
      showWelcomePage(false);
    }
  );

  context.subscriptions.push(disposableCommand);

  // Monitor editor changes to track when other editors are opened
  vscode.window.onDidChangeVisibleTextEditors(
    async (editors) => {
      console.log(`Visible editors changed: ${editors.length} editors open.`);

      // Check if any non-welcome editors are open
      const hasNonWelcomeEditors = editors.some(
        (editor) => editor.document.uri.scheme !== "webview"
      );

      if (hasNonWelcomeEditors) {
        hasOpenedOtherEditors = true;
        console.log(
          "Non-welcome editors detected, setting hasOpenedOtherEditors to true."
        );
        // Restore the sidebar if it was hidden
        if (isSidebarHidden) {
          console.log(
            "Restoring sidebar visibility because a file was opened."
          );
          vscode.commands.executeCommand(
            "workbench.action.toggleSidebarVisibility"
          );
          isSidebarHidden = false;
        }
      }

      // If no editors are open (excluding the welcome panel), show the welcome page
      if (
        editors.length === 0 &&
        config.get("workbench.colorTheme") === "Minimal BLue" &&
        !wasClosedByUser &&
        hasRunBefore
      ) {
        console.log(
          "No editors open and theme is Minimal BLue, showing welcome page."
        );
        showWelcomePage(true);
      }
    },
    null,
    context.subscriptions
  );

  // Show the welcome page on startup if the theme is Minimal BLue, but only on subsequent runs
  if (config.get("workbench.colorTheme") === "Minimal BLue" && hasRunBefore) {
    console.log(
      "Theme is Minimal BLue, scheduling welcome page to show immediately."
    );
    setTimeout(() => {
      // Close any existing editors (like the splash screen or welcome page)
      vscode.commands
        .executeCommand("workbench.action.closeAllEditors")
        .then(() => {
          if (!hasOpenedOtherEditors) {
            console.log("No other editors opened yet, showing welcome page.");
            showWelcomePage(true);
          } else {
            console.log(
              "Other editors already opened, ensuring welcome page is open if no editors are open."
            );
            if (
              vscode.window.visibleTextEditors.length === 0 &&
              !wasClosedByUser
            ) {
              showWelcomePage(true);
            }
          }
        });
    }, 100); // Delay to ensure VS Code is fully initialized
  }
}

function getWebviewContent(svgContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Minimal BLue Welcome</title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: var(--vscode-editor-background, #051726);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg {
          width: 100%;
          height: 100%;
          fill: var(--vscode-foreground, #87CEEB);
          object-fit: contain;
        }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;
}

function deactivate() {
  console.log("Minimal BLue extension is now deactivated.");
}

module.exports = {
  activate,
  deactivate,
};

# Tic-Tac-Toe Game

A responsive browser-based Tic-Tac-Toe game built with HTML, CSS, and vanilla JavaScript.

## Features

- Play against an unbeatable computer opponent (minimax algorithm)
- Two-player local mode
- Scoreboard for X and O
- Winner highlighting and draw detection
- Restart round and reset scores
- Responsive layout and accessible status announcements
- No build tools or dependencies required

## Run locally

1. Download or clone this repository.
2. Open `index.html` in any modern browser.
3. Choose **Play vs Computer** or **Two Players**, then play.

For a local development server, you can use the VS Code Live Server extension, or run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy with GitHub Pages

1. Push these files to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for the deployment workflow to finish. Your site URL will appear in the Pages section.

## Project structure

```text
tic-tac-toe-game/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How the computer works

The computer uses the minimax algorithm to evaluate possible moves and choose an optimal move. With perfect play, it cannot be beaten; a draw is possible.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).

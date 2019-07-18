import { GameStatus } from './Utils';
import { Board } from './Board';
import { Player } from './Player';

export class Game {
    board: Board;
    status: GameStatus;
    currentPlayer: Player;
    playerOne: Player;
    playerTwo: Player;
    history: string[];

    constructor(n: number, m: number) {
        this.status = GameStatus.InProgress;
        this.board = new Board(n, m);
        this.history = [];
    }

    addPlayer(player: Player) {
        if (!this.playerOne) {
            this.playerOne = player;
            this.currentPlayer = player;
        } else if (!this.playerTwo) {
            this.playerTwo = player;
        }
        else {
            console.log("Two players have already been added");
        }
    }

    printSummary() {
        if (!this.history) {
            console.log("Game is in progress");
            return;
        }

        switch (this.status) {
            case GameStatus.InProgress:
                console.log("Game is in progress");
                console.log("Moves history:");
                console.log(this.history.join('\n'));
                break;
            case GameStatus.Completed:
                console.log(`${this.currentPlayer.name} won!`);
                console.log("Moves history:");
                console.log(this.history.join('\n'));
                break;
        }
    }

    nextMove(row: number, col: number): boolean {
        //Check if it is a bad move
        if (this.status === GameStatus.Completed || this.board.isOccupiedCell(row, col)) return false;

        //Add to moves history
        this.history.push(`${this.currentPlayer.name} placed ${this.currentPlayer.sign} in (${row},${col})`);
        this.board.updateBoard(row, col, this.currentPlayer.sign);
        if (this.board.isCompleted) {
            this.status = GameStatus.Completed;
        }
        else {
            //Switch turns
            if (this.currentPlayer.name === this.playerOne.name) {
                this.currentPlayer = this.playerTwo;
            }
            else {
                this.currentPlayer = this.playerOne;
            }
        }
        return true;
    }

}



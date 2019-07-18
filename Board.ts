export class Board {
    isCompleted: boolean;
    board: string[][];
    size: number;

    constructor(n: number = 3, m: number = 3) {
        if (n !== m || n < 3) {
            console.log("Illegal board size");
            console.log("Creating a default 3X3 board");
            n = 3;
            m = 3;
        }

        this.size = n;
        this.isCompleted = false;
        this.board = [];
        for (let i = 0; i < n; i++) {
            this.board[i] = [];
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                this.board[i][j] = '*';
            }
        }
    }

    isOccupiedCell(row: number, col: number): boolean {
        return this.board[row][col] !== '*';
    }

    print() {
        let boardString = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                boardString += ` ${this.board[i][j]}`;
            }
            if (i !== this.board.length - 1) {
                boardString += '\n'
            }
        }
        console.log(boardString);
    }

    updateBoard(row: number, col: number, sign: string) {
        this.board[row][col] = sign;
        this.isCompleted = (this.checkRow(row) || this.checkCol(col) || ((row === col) && this.mainDiagonal()) || (((row + col) === (this.size - 1)) && this.antiDiagonal())) ? true : false;
    }

    private checkRow(row: number): boolean {
        let firstVal = this.board[row][0];
        let ans = true;
        for (let j = 1; j < this.board[row].length; j++) {
            if (this.board[row][j] === '*' || this.board[row][j] !== firstVal) {
                ans = false;
                break;
            }
        }
        return ans;
    }

    private checkCol(col: number): boolean {
        let firstVal = this.board[0][col];
        let ans = true;
        for (let i = 1; i < this.board.length; i++) {
            if (this.board[i][col] === '*' || this.board[i][col] !== firstVal) {
                ans = false;
                break;
            }
        }
        return ans;
    }

    private mainDiagonal(): boolean {
        let firstVal = this.board[0][0];
        let ans = true;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][i] === '*' || this.board[i][i] !== firstVal) {
                ans = false;
                break;
            }
        }
        return ans;
    }

    private antiDiagonal(): boolean {
        let j = this.board[0].length - 1;
        let firstVal = this.board[0][j];
        let ans = true;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][j] === '*' || this.board[i][j] !== firstVal) {
                ans = false;
                break;
            }
            j--;
        }
        return ans;
    }
}

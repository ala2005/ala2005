/*
  28.01.22 0.1   initial version
*/
import { existsSync, readFileSync } from "fs";
// -----------------------------------------------------------------------------
export interface TextfileReaderOptions {
  fileEncoding?: string;
  lineBreak?: string;
}
// -----------------------------------------------------------------------------
export class TextfileReader {
  private gFilename: string = "";
  private gFileEncoding: string = "utf-8";
  private gLineBreak: string = "\r\n";
  private gArrFileData: string[] = [];
  get pArrFileData(): string[] {
    return [ ...this.gArrFileData ];
  }
  // ---------------------------------------------------------------------------
  constructor(pFilename: string, pOptions?: TextfileReaderOptions) {
    this.gFilename = pFilename;

    if (pOptions != null) {
      this.gFileEncoding = pOptions.fileEncoding ?? this.gFileEncoding;
      this.gLineBreak = pOptions.lineBreak ?? this.gLineBreak;
    }

    if (existsSync(this.gFilename) === false) {
      throw new Error(`File ${this.gFilename} not found!`);
    }
    this.loadFile();
  }
  // ---------------------------------------------------------------------------
  private loadFile(): void {
    const file = readFileSync(this.gFilename, this.gFileEncoding as BufferEncoding);
    this.gArrFileData = file.toString().split(this.gLineBreak);
  }
  // ---------------------------------------------------------------------------
}
// -----------------------------------------------------------------------------

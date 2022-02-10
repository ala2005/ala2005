/*
  28.01.22 0.1   initial version
  10.02.22 0.1.1 changes
                   parameters renamed
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
  constructor(filename: string, options?: TextfileReaderOptions) {
    this.gFilename = filename;

    if (options != null) {
      this.gFileEncoding = options.fileEncoding ?? this.gFileEncoding;
      this.gLineBreak = options.lineBreak ?? this.gLineBreak;
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

/** @internal */
export class BinaryParser {
    
    private MyBuffer: number[] = null;
    
    private Cursor: number = 0;
    
    /* internal */ 
    constructor (buffer: number[]) {
        this.MyBuffer = buffer;
    }
    
    ///  <summary>
    ///  Advance the position of the cursor in the buffer
    ///  by count.
    ///  </summary>
    ///  <param name="count"></param>
    /* internal */ 
    Advance(count: number) {
        if (((this.Cursor + count) 
                    < this.MyBuffer.Length)) {
            this.Cursor = (this.Cursor + count);
        }
        
    }
}
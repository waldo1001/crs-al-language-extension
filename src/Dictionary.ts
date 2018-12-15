export interface IDictionary<T> {
    Add(key: string, value: T);
    ContainsKey(key: string): boolean;
    Count(): number;
    Remove(key: string);
    Item(key: string): T;
    Keys(): string[];
    Values(): T[];
}

export class Dictionary<T> implements IDictionary<T> {
    private items: { [index: string]: T } = {};

    private count: number = 0;

    public Add(key: string, value: T) {
        if(!this.items.hasOwnProperty(key))
             this.count++;

        this.items[key] = value;
    }

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Remove(key: string) {
        var val = this.items[key];
        delete this.items[key];
        this.count--;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        var keySet: string[] = [];

        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        var values: T[] = [];

        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }
}
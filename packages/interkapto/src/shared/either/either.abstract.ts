export default abstract class AbstractEither<V> {
    protected eitherValue: V;

    public constructor(eitherValue: V) {
        this.eitherValue = eitherValue;

        Object.freeze(this);
    }

    public getValue(): V {
        return this.eitherValue;
    }

    public abstract isErr(): boolean;
    public abstract isOk(): boolean;
}

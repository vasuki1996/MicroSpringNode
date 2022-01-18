export interface ShapesData {
    /**
     * Specify individual fields in items.
     *
     * @items.type integer
     * @items.minimum 0
     */
    sizes: number[];

    /**
     * Or specify a JSON spec:
     *
     * @items {"type":"string","format":"email"}
     */
    emails: string[];
}
interface ITranferDocs {
    id: number;
    citizenName: string;
    citizenEmail: string;
    Documents: {
        [index: string]: string[]
    }

}
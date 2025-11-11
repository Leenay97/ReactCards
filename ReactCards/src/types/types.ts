interface iPack {
    name: string,
    content: string
}

export interface OneWord {
    russian: string,
    english: string
}

export interface SelectPanelProps {
    pack: iPack[],
    onChangeSelected: React.Dispatch<React.SetStateAction<string>>
}

export interface CardProps {
    addWord: (english: string, russian: string) => void,
    hardmode: boolean,
    selectedWords: OneWord[],
    pack: OneWord[]
}

export type WordListProps = {
    deleteWord: (english: string) => void,
    isOpen: boolean,
    wordList: OneWord[]
}
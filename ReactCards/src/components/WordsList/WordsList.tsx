
import type { OneWord, WordListProps } from "../../types/types"
import './WordsList.scss'


const WordsList = ({ deleteWord, wordList, isOpen }: WordListProps) => {

    // function deleteWord(word: OneWord) {
    //     const newWords = words.filter((item: OneWord) => word.english !== item.english)
    //     setWords(newWords);
    //     localStorage.setItem('words', JSON.stringify(newWords))

    // }


    return (
        <div className={isOpen ? "words-wrapper" : "words-wrapper closed"}>
            <ul className="words-list">
                {wordList.map((item: OneWord) => (
                    <li>
                        <button onClick={() => { deleteWord(item.english) }} />
                        {item.english}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default WordsList
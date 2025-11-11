import { useState, useEffect } from 'react'
import './Card.scss'
import type { CardProps, OneWord } from '../../types/types'




const Card = ({ addWord, pack, selectedWords, hardmode }: CardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [currentCards, setCurrentCards] = useState(pack)
    const [cardContent, setCardContent] = useState('')
    const [currentCard, setCurrentCard] = useState(randomize())
    const [isRussianFirst, setIsRussianFirst] = useState<boolean>(false)

    function randomize(arr?: OneWord[]) {
        let rnd = 0;
        if (arr) {
            rnd = Math.floor(Math.random() * (arr.length - 1))
        } else {
            rnd = Math.floor(Math.random() * (currentCards.length - 1))
        }
        return rnd
    }

    async function modeChange() {
        if (hardmode) {
            setCurrentCards(selectedWords)
            setCurrentCard(randomize(selectedWords))
        } else {
            setCurrentCards(pack)
            setCurrentCard(randomize(pack))
        }
    }

    function handleNextClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (currentCards.length === 0) {
            if (hardmode) {
                setCurrentCards(selectedWords)
            } else {
                setCurrentCards(pack)
            }
        } else {
            changeCard(e, true)
        }

    }



    const changeCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, success: boolean) => {
        e.stopPropagation()
        let newCards = currentCards;
        if (success) {
            newCards = currentCards.filter((_, i) => i !== currentCard)
            setCurrentCards(newCards)
        }
        if (!success) {
            addWord(currentCards[currentCard].english, currentCards[currentCard].russian)
        }


        setIsFlipped(false)
        if (currentCards.length === 0) {
            return 'No Cards Anymore'
        }
        setCurrentCard(randomize())
    }

    const flipCard = () => {
        setIsFlipped(state => !state)
    }

    useEffect(() => {
        setCurrentCards(pack)
    }, [pack])

    useEffect(() => {
        modeChange()
    }, [hardmode])

    useEffect(() => {
        if (currentCards.length === 0) {
            setCardContent('You did it!')
        } else {
            if (isRussianFirst) {
                isFlipped ? setCardContent(currentCards[currentCard]?.english) : setCardContent(currentCards[currentCard]?.russian)
            } else {
                isFlipped ? setCardContent(currentCards[currentCard]?.russian) : setCardContent(currentCards[currentCard]?.english)
            }
            
        }

    }, [currentCards, isFlipped, currentCard, isRussianFirst])

    return (
        <>
            <div className="language-selector" onClick={() => setIsRussianFirst(state => !state)}>{isRussianFirst ? 'Russian First' : 'English First'}</div>
            <div className="card-wrapper">
                <div className={`card ${isFlipped ? '' : ''}`} onClick={flipCard}>
                    <div className="card-content">{cardContent}</div>
                    <div className="card-btns">
                        <button className="delete-btn" onClick={(e) => changeCard(e, false)}></button>
                        <div className="counter">Осталось {currentCards.length}</div>
                        <button className="next-btn" onClick={(e) => handleNextClick(e)}></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
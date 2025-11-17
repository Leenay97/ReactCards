import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import SelectPanel from './components/SelectPanel/SelectPanel'
import WordsList from './components/WordsList/WordsList'
import type { OneWord } from './types/types'

const packs = [
  {
    name: 'Y2L1',
    content: "share an apartment - жить с кем-то в одной квартире||||roommate - сосед по квартире||||disappear - исчезать||||the underground (Br) / the subway (Am) - метро||||easy-going - покладистый, с легким характером||||independent - независимый||||brave - смелый||||selfish - эгоистичный||||reliable - надежный||||calm - спокойный||||honest - честный||||serious - серьезный||||shy - застенчивый||||mean (Br Eng. скупой) - злой, скупой||||patient - терпеливый||||stubborn - упрямый||||weak - слабый||||intelligent - умный||||neat / tidy - аккуратный||||creepy - противный, мерзкий||||psychologist - психолог, психотерапевт||||therapist - терапевт, псих. директор||||CEO - исполнительный директор||||vet - ветеринар||||criminal - преступник||||sportsman (Br), athlete (Am) - спортсмен||||office worker - офисный работник||||career - карьера||||strength - сильная сторона||||weakness - слабая сторона||||get promoted - получить повышение||||get a raise / a pay rise - получить прибавку к зарплате||||get a new client - получить нового клиента||||I'm good at smth - у меня хорошо получается что-то||||oversleep - проспать||||improve - улучшить(ся)||||both (of them) - оба||||the same - такой же, тот же||||stepfather, stepmother - отчим, мачеха||||get on (really well) (with smb) - ладить, быть в хороших отношениях||||be married TO smb - быть замужем / женатым на ком-то||||loud / loudly - громкий, громко||||ex-girlfriend, ex-husband - бывшая девушка, бывший муж||||it’s complicated - всё сложно||||neighbour - сосед||||colleague - коллега||||What a mess! - Что за бардак!||||knock AT/ON the door - стучать в дверь||||shout AT smb - кричать на кого-то||||extra (hour / money) - дополнительный (час / деньги)||||pick up (the phone) - взять трубку||||look after smb - присматривать за кем-то||||baggage / luggage - багаж||||I FEEL... - Я ЧУВСТВУЮ СЕБЯ...||||nervous - я нервничаю||||worried - я беспокоюсь||||lonely - мне одиноко||||excited - я очень рад||||upset - я расстроен||||surprised - я удивлен||||jealous - я ревную, я завидую||||guilty - я чувствую себя виноватым||||proud - я горжусь||||shocked - я шокирован||||in love (with smb) - я влюблен (в кого-то)||||confused - я запутался||||taste - иметь вкус / пробовать (на вкус)||||It tastes great! - Это вкусно!||||I’d like to taste the soup. - Я бы хотел попробовать суп.||||coconut - кокос||||sweetened condensed milk - сгущенка||||raw - сырой||||ingredient - ингредиент||||loaf of bread - булка хлеба||||lamb - баранина||||spices - приправы||||herring - селедка||||beetroot - свекла||||grow on smb - нравится все больше||||nuts - орехи||||purple - фиолетовый||||I’ll give it a go! - Я попробую! Я рискну!||||gross - отвратительный||||in her twenties - ей за двадцать (20–30 лет)||||in his fifties - ему за пятьдесят (50–59)||||in his teens - ему около 13–19 лет||||about forty - ему около сорока лет||||young - молодой, маленький||||old - старый||||slim - стройный||||skinny - худой||||fat - жирный||||fit - подтянутый||||muscular - мускулистый||||in good shape - в хорошей форме||||in bad shape - в плохой форме||||good-looking - хорошо выглядит||||handsome - красивый (о мужчине)||||beautiful - красивая (о женщине)||||pretty - хорошенькая||||cute - милый, привлекательный||||hot - сексуальный, красивый||||ugly - уродливый||||blond hair - светлые волосы||||red hair - рыжие волосы||||dark hair - темные волосы||||brown hair - каштановые волосы||||black hair - черные волосы||||gray hair - седые волосы||||straight hair - прямые волосы||||curly hair - кудрявые волосы||||long hair - длинные волосы||||short hair - короткие волосы||||he is bald - он лысый||||a beard - борода||||a moustache - усы||||a scar - шрам||||a tattoo - татуировка||||glasses - очки||||dark skin - темная кожа||||light skin - светлая кожа"

  },
  {
    name: 'Y2L2',
    content: 'correct smth/smb - исправить что-то, кого-то||||once in a while - время от времени||||pregnant - беременная||||come over - прийти в гости, заглянуть||||excuse - оправдание, отговорка||||ferry - паром||||Ukraine, Ukrainian - Украина, украинский||||go out with smb - встречаться с кем-то, ходить на свидания||||slutty (very rude) - вульгарный||||throw up - тошнить, рвать||||actually - на самом деле||||candy bar - шоколадный батончик||||grab - хватать||||grab a coffee, a drink - выпить кофе, что-то||||wedding - свадьба||||Anyway - Короче, в любом случае||||What’s funny about that? - Что в этом смешного?||||I couldn’t care less - Мне наплевать||||I didn’t sleep today. Really? How come? - Почему? Как так вышло?(разг.)||||He’s so sweet! - Он такой милый!||||That’s (un)fair! - Это (не)честно!||||Screw you! (very rude) - Пошел ты!||||I got hammered - Я напился||||Have a great time, you guys - Хорошо провести вам время, ребята||||No matter what - Несмотря ни на что||||Who cares? - Кому какое дело?||||I appreciate it - Я очень это ценю / Я благодарен||||Give me a hand! - Помоги мне!||||stay in a hotel - остановиться в гостинице||||stay with smb / a friend / stay at smb’s (my friend’s) - остановиться у кого-то, у друга||||stay for (a week) - остановиться (на неделю), провести (неделю)||||go back home - вернуться домой||||go sightseeing / see the sights - осматривать достопримечательности||||buy souvenirs - покупать сувениры||||book a ticket, book a flight, book a train - забронировать билет, билет на самолет, поезд||||book a room - забронировать комнату||||book accommodation - забронировать жильё||||eat out - есть в ресторане, кафе (не дома)||||eat in local restaurants - есть в местных ресторанах||||rent a car - арендовать машину||||rent a flat (Br) / rent an apartment (Am) - арендовать квартиру||||bank - банк||||café / coffee shop - кафе, кофейня||||hospital - больница||||pub - паб||||bus stop - остановка автобуса||||stadium - стадион||||shopping center, mall - торговый центр||||theatre (Br) - театр||||airport - аэропорт||||apartment building - многоквартирный дом||||hotel - гостиница||||supermarket - супермаркет||||car park / parking lot - парковка||||gas station - автозаправка||||gym - тренажёрный зал||||pharmacy / drugstore (Am) - аптека||||kindergarten - детский сад||||post office - почта||||hair salon - парикмахерская||||cheap - дешёвый||||free - бесплатный||||island - остров||||statue - статуя||||amusement park - парк аттракционов||||swimming pool - бассейн||||museum - музей||||prison - тюрьма||||police station - полицейский участок||||movie theater / cinema (Br) - кинотеатр||||(flea) market - (блошиный) рынок||||crowded - многолюдный, битком набитый||||go on a tour (of), take a tour (of) - пройти экскурсию, осматривать||||library - библиотека||||skating rink - каток||||explore - исследовать, изучать||||church - церковь||||bridge - мост||||downtown - центр города||||zoo - зоопарк||||circus - цирк||||earphones - наушники||||headphones - наушники||||hairdryer - фен||||backpack - рюкзак||||jewellery (Br) - украшения||||tablet - планшет||||medication / medicine - лекарства||||underwear and socks - бельё и носки||||cash - наличные||||phone charger - зарядник для телефона||||wet wipes - влажные салфетки||||tissues - бумажные салфетки||||guidebook - путеводитель||||go to a check-in desk - пройти к стойке регистрации||||check in (on time) - пройти регистрацию (вовремя)||||wait in a queue (Br) / wait in a line (Am) - ждать в очереди||||take a boarding pass - взять посадочный талон||||go through security - пройти предполётный досмотр||||go to a duty-free shop - пойти в дьюти-фри||||go through passport control - проходить паспортный контроль||||wait in the departure lounge - ждать в зале вылета||||your flight is delayed (by 2 hours) / cancelled - ваш рейс задержан (на 2 часа) / отменен||||go to the departure gate - пройти к выходу на посадку||||board a plane / get on a plane - сесть в самолёт||||the plane takes off - самолёт взлетает||||go through customs - пройти таможню||||depart (at 9 a.m.) - вылететь (в 9 утра)||||inconvenience - неудобство||||check (in) a bag - сдавать сумку в багаж||||a carry-on (bag) - ручная кладь||||leave smth unattended - оставлять что-то без присмотра||||window seat / middle seat / aisle seat - место у окна / в середине / в проходе||||baggage claim - талон на / зона получения багажа||||common - распространённый||||disabled (person) - человек с ограниченными возможностями||||jump the line / queue - без очереди||||post (a photo) on social media - выложить (фото) в соцсетях||||even though - хотя, несмотря на то, что||||it bothers me - это меня беспокоит||||airline - авиакомпания||||switch (seats) - поменяться (местами)||||passenger - пассажир'

  },
]

function App() {
  const [selected, setSelected] = useState('Y2L2')
  const [isListOpen, setIsListOpen] = useState<boolean>(false)
  const [wordsList, setWordsList] = useState<OneWord[]>([])
  const [isOnlySelected, setIsOnlySelected] = useState<boolean>(false)

  useEffect(() => {
    const localWords = localStorage.getItem('words')
    if (localWords) {
      setWordsList(JSON.parse(localWords))
    }
  }, [])

  const addWordToList = (english: string, russian: string) => {
    const isNew = wordsList.some(word => word.english === english)
    if (isNew) {
      console.log('exists')
      return;
    }
    const newList: OneWord[] = [...wordsList, { english: english, russian: russian }]
    localStorage.setItem('words', JSON.stringify(newList))
    setWordsList(newList)
  }

  const deleteWordFromList = (english: string) => {
    const newList = wordsList.filter((word: OneWord) => word.english !== english)
    localStorage.setItem('words', JSON.stringify(newList))
    setWordsList(newList)
  }

  const selectedPack = useMemo(() => {
    const newPack = packs.filter(item => item.name === selected)[0]
    const packArray = newPack.content?.split('||||')
    return packArray.map(item => {
      const [english, russian] = item.split(' - ')
      return { english, russian }
    })
  }, [selected])

  useEffect(() => {
    const savedPacks = localStorage.getItem('packs');
    if (!savedPacks) {
      // Сохраняем текущий выбранный пакет один раз
      const initialPack = packs.find(item => item.name === selected);
      if (!initialPack) return;
      const packArray = initialPack.content.split('||||').map(item => {
        const [english, russian] = item.split(' - ');
        return { english, russian };
      });
      localStorage.setItem('packs', JSON.stringify(packArray));
    }
  }, []);

  const toggleWords = () => {
    setIsListOpen(prev => !prev)
  }

  return (
    <>
      <header onClick={toggleWords}>
        {isListOpen ? 'Hide list' : 'Show list'}
      </header>
      <div className="card-container">
        <SelectPanel onChangeSelected={setSelected} pack={packs} />
        <Card addWord={addWordToList}
          pack={selectedPack}
          selectedWords={wordsList}
          hardmode={isOnlySelected} />

      </div>
      <WordsList deleteWord={deleteWordFromList} wordList={wordsList} isOpen={isListOpen} />
      <button className='selected-btn' onClick={() => setIsOnlySelected(prev => !prev)}>{isOnlySelected ? 'Hard words' : 'All words'}</button>

    </>
  )
}

export default App

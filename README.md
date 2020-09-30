# Schedule

### Содержание документа:
- Цель разработки
    - Концепт приложения
    - Преимущества и недостатки
    - Идеальное расписание
    - Определение потребностей пользователей
    - Идеи по улучшению расписания
- Макет приложения 
- Документация для разработчиков
    - Требования
    - Технологии проекта
    - Особенности приложения
    - Библиотеки и модули
- Обратная связь    
<br><br>
## Цель разработки
Это приложение разработано для Rolling Scopes School.
Цель - улучшить существующее расписание для студентов и менторов.
<br><br>
# Концепт приложения
### Преимущества и недостатки 
| rs app        |          |  *| Таблица в Google docs        |           |  
| ------------- |-------------| -----| ------------- |-------------| 
| **Преимущества**        | **Недостатки**            | *  | **Преимущества**        | **Недостатки**           | 
| находится внутри приложения и не нужно переключаться      | неверная неточная информация | * | предположительно легко править менторам      | слишком много информации в 1 месте |
| у пройденных тасков шрифт более прозрачный и проще ориентироваться какие таски актуальны      | неполное расписание      |  * | можно добавить любое количество информации, в отличии от расписания в rss app      | яркие цвета непонятно что обозначающие      |   
| мало информации (сразу видно какой таск, когда дедлайн, нет миллиона полей и человек не путается) | мало информации(нет уточнения, комментариев, дополнительных ссылок)      |   * | не нужно быть записанным на курс чтобы смотреть расписание и учиться по нему | можно случайно открыть не ту вкладку, это трата времении раздражает      |   
|   вся информация в одном месте     | нет деления на недели | * |  разделение на стэйджи   |нужно найти определенную дату и определенный таск, что непросто даже тем кто уже давно знаком с расписанием |
|    приятный внешний вид   | не выделены главные таски, вообще ничего не выделено, стена текста | * |     |чтобы понять как пользоваться - нужно провести стрим, на это уходит время |
|   наглядно видно тип задания (test, interview, task, deadline)   |  | * |    |внешний вид - это таблица, немного разукрашенная. Но при любом объеме ее заполнения она превращается в кашу. |
|       |  | * |     | когда работает много пользователей одновременно тупит или вообще не открывается |
### Идеальное расписание
1. полностью готово ДО старта курса
1. всегда актуально, то есть изменения сначала вносятся и потом анонсируются в чатах
1. пройденные задания и те у которых прошел дедлайн отмечены более светлым шрифтом
1. расписание должно быть в rs-app, то есть все в 1 месте
## Определение потребностей пользователей
Проведен опрос среди студентов и менторов: 
 - каким они видят идеальное расписание, 
 - чего им не хватает в действующем расписании и в расписании rs app, 
 - какие у этих двух расписаний преимущества и недостатки с точки зрения пользователей
#### Ответы:
1. неудобная статистика заданий сделано/не сделано. Нет четкого чек-листа

1. Все расписание в экселе, ссылки не очень хорошо систематизированы. Наверное, в экселе это сложно 
сделать (или невозможно). Но мне лично неудобно. Особенно что задание в одном месте, решать задачи в другом, 
видео в третьем, а отправлять из четвертого. Т.к. это для совсем новичков, вносит неразбериху.
"Было бы удобнее сделать все (или хотя бы большую часть как в htmlacademy). Вот сейчас мой кабинет студента выглядит так
http://joxi.ru/p27N6agTNpjRlm"

1. "Программа в html academy выглядит вот так, и это тоже удобно. Я понимаю, что я сделала, а что еще нет.
http://joxi.ru/eAOP0z5iknq8xr"

1. "Еще я сейчас занимаюсь на другой платформе, там очень удобные баллы по ДЗ. Сразу видно, сделала ли я задание и 
сколько баллов получила. Вот ссылка на сайт https://itgid.info/course/javascript-2
Вот скрин. Лично мне оч нравится такой формат, легко ориентироваться. 
И сразу понятно, что не сделано и куда двигаться дальше - http://joxi.ru/LmGPq97ild5Od2"
1. "вот скрин ответа по ДЗ от преподавателя (там же, не отходя от кассы) - http://joxi.ru/J2bPNgJiVELner"

1.  вот мне бы хотелось чтобы все было в одном месте и виден прогресс. Потому что у меня сейчас так: открываешь дискорд,
 там ссылка на задание, с задания на гитхаб, с гитхаба на codewars(17 разных ссылок), оттуда переходишь по ссылке 
 в приложение, оттуда ссылка на тестирование по юзернику. В этот момент тебе кто-то звонит, ты выходишь из комнаты, 
 и через 10 минут, когда возвращаешься, у тебя 23 открытых ссылки. Главное чтобы в это время ребенок не успел 
 поклацать по клавиатуре)) И ты сидишь со своими 22 ссылками и пытаешься вспомнить, кто ты есть и зачем ты здесь)).
 это я утрирую конечно, но смысл примерно такой)
 
 1. Если не считать того , что расписания не синхронизированы, что они не доделаны и пока редактируются, 
 я бы для себя в google docs выделила цветом выдачу таск, помимо дедлайнов, а то я когда смотрю расписание, 
 все время переживаю, что пропустила, не увидела, не заметила какое-то задание.
 
 1. неудобно что это гугл-док. На платформе было бы удобнее, чтобы была возможность ставить галочки о прохождении этапа.
  Например, я сейчас копировала себе всю таблицу и зеленой заливкой отмечаю что выполнено. 
  Но минус в том, что это моя локальная таблица. Если что-то поменяется в главном расписании, я могу это потерять. 
  Чтобы не потерялось, я захожу раз в 2-3 дня и сверяю координаты.
  Пока идет 1-я неделя обучения это норм. Но потом можно что-то упустить из-за большого кол-ва информации.
  Вот у меня в академии сейчас так, и мне так намного удобнее https://pastenow.ru/A5MB1
  Сделаное зелененьким, остальное выделено серым. Сложно перепутать или пропустить что-то)
  1.если бы расписание было полностью готово, я бы тоже его себе скопировала и там бы уже сама и цветами выделила, 
  что и как надо, отметила бы что уже сдала, какие лекции посмотрела.
  1. расписание в гугл доках, когда над ним работает много пользователей одновременно тупит или вообще не открывается
## Идеи по улучшению расписания
1. когда человек заходит в rs app - он сразу видит меню слева, как например, в lingvist - http://joxi.ru/zANPpzQijO5bXm 
там слева меню, при наведении раскрывается и так людям будет понятно где что,
<br>ссылки на доки слева в меню,
<br>ссылки на чат слева в меню и на расписание тоже.
2. все задания должны быть в rs-app, включая самообучение
3. из расписания всего 1 переход:
    - на гитхаб (и там уже пояснения и много ссылок)
    - на ютуб
    - на сайт по теме <br> Но не милллион ссылок тк люди путаются
4. если для выделения используются цвета, то отдельно выделены подсказки по цветам - что они означают 
и не нужно догадываться и првоодить для этого отдельный стрим
<br><br>
## Макет приложения 
[По клику вы перейдете на макет приложения в Figma](https://www.figma.com/file/hvdGAAK23ynBOW10pw0aWY/main-concept?node-id=0%3A1 "макет в фигме")
<br><br>
## Документация для разработчиков
#### Требования
1. Mac OS X, Windows, или Linux
2. Yarn package + Node.js v6.5 или выше
<br><br>
#### Технологии проекта
- React
- Typescript
- Ant Design
- Redux и Redux Saga
<br><br>
#### Особенности приложения
- выбор курса
- таски с прошедшей датой выделены более светлым шрифтом

##### Возможности студента:

- просмотр расписания в виде таблицы (основная форма расписания), календаря либо списка
- просмотр детальной информации об отдельных заданиях расписания. Структуру страницы задания для разных типов заданий вам необходимо продумать самостоятельно
- сохранение расписания в виде таблицы, списка или календаря. Оптимальные форматы файлов (.txt, .pdf, .csv etc) для сохранения расписания определите исходя из потребностей пользователей

##### Дополнительные возможности ментора:

- редактирование расписания - добавление, удаление и изменение данных
- редактирование страницы задания - добавление, удаление и изменение данных
<br><br>
#### Установка приложения

приложение устанавливается через yarn.
<br>
как установить yarn, официальная документация на русском:<br>
[https://classic.yarnpkg.com/ru/docs/install#windows-stable](https://classic.yarnpkg.com/ru/docs/install#windows-stable)

 ```
 yarn install
```
 ```
 yarn start
```
<br><br>
#### Библиотеки и модули

#### emotion
Emotion is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities. Both string and object styles are supported.

#### SVGR
Transform SVGs into React components.

#### lodash
Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash’s modular methods are great for:

- Iterating arrays, objects, & strings
- Manipulating & testing values
- Creating composite functions

#### ramda
The primary distinguishing features of Ramda are:

- Ramda emphasizes a purer functional style. Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.
- Ramda functions are automatically curried. This allows you to easily build up new functions from old ones simply by not supplying the final parameters.
- The parameters to Ramda functions are arranged to make it convenient for currying. The data to be operated on is generally supplied last.
The last two points together make it very easy to build functions as sequences of simpler functions, each of which transforms the data and passes it along to the next. Ramda is designed to support this style of coding.

#### styled-components
Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, styled-components allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – using components as a low-level styling construct could not be easier!

#### superagent
Small progressive client-side HTTP request library, and Node.js module with the same API, supporting many high-level HTTP client features

#### dotenv
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

#### fs-extra
fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for fs.

#### downloadjs
Client-side file downloading using JS and HTML5.
The download() function is used to trigger a file download from JavaScript. It specifies the contents and name of a new file placed in the browser's download directory. The input can be a String, Blob, or Typed Array of data, or via a dataURL representing the file's data as base64 or url-encoded string. No matter the input format, download() saves a file using the specified file name and mime information in the same manner as a server using a Content-Disposition HTTP header.

#### rc-tooltip
React Tooltip

#### lint-staged
Run linters against staged git files and don't let 💩 slip into your code base!

#### moment
Parse, validate, manipulate,
and display dates and times in JavaScript.

#### ts-pnp
This package exports a function that can be used to implement the resolveModuleName hook from CompilerHost. It mimics the interface from the one you'd typically use and, as all other PnP plugins, works just fine whether your application is actually running under PnP or not.
<br><br>
## Обратная связь  
Для обратной связи пишите в канал дискорда - https://discord.com/channels/720532874629087253/720532874629087256

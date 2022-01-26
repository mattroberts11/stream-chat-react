import React, {forwardRef} from 'react';
import { StreamChat } from 'stream-chat';
// import { ChatClientProvider, ChatClientContext } from './ChatClientContext';
import { 
  Chat, 
  Channel, 
  ChannelHeader, 
  ChannelList, 
  LoadingIndicator,
  MessageInput, 
  MessageList, 
  Thread, 
  Window, 
  // TypingIndicator,
  // useChannelStateContext,
  // useChatContext,
} from 'stream-chat-react';

import {
  ChatAutoComplete,
  EmojiIconLarge,
  EmojiPicker,
  SendButton,
  Tooltip,
  useMessageInputContext,
  useTranslationContext,
 } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/index.css';
// import './myAppStyles.css';

// import '@stream-io/@stream-io/stream-chat-css/dist/css/index.css';
import '@stream-io/stream-chat-css'

import './App.css';

const key = process.env.REACT_APP_STREAM_API_KEY;
const token = process.env.REACT_APP_TOKEN;
const client = StreamChat.getInstance(key);


client.connectUser(
  {
    id: 'katy',
    name: 'katy',
    image: 'https://getstream.io/random_png/?id=icy-river-8&name=icy-river-8',
  },
  token,
);

const CustomMessageInput = () => {
  const { t } = useTranslationContext();
 
  const {
    closeEmojiPicker,
    emojiPickerIsOpen,
    handleEmojiKeyDown,
    handleSubmit,
    openEmojiPicker,
    textareaRef,
  } = useMessageInputContext();

console.log('TEXT AREA REF', textareaRef.current);

  return (
    <div className='str-chat__input-flat str-chat__input-flat--send-button-active'>
      <div className='str-chat__input-flat-wrapper'>
        <div className='str-chat__input-flat--textarea-wrapper'>
          <div className='str-chat__input-flat-wrapper'>
            {/* <textarea ref={textareaRef} className='rta__textarea str-chat__textarea__textarea'></textarea> */}
            
          </div>
           <ChatAutoComplete  className="MATT-WAS-HERE"/>
           
          
         <div className='str-chat__emojiselect-wrapper'>
            <Tooltip>
              {emojiPickerIsOpen ? t('Close emoji picker') : t('Open emoji picker')}
            </Tooltip>
            <span
              className='str-chat__input-flat-emojiselect'
              onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
              onKeyDown={handleEmojiKeyDown}
              role='button'
              tabIndex={0}
            >
              <EmojiIconLarge />
            </span>
          </div>
          <EmojiPicker />
        </div> 
        <SendButton sendMessage={handleSubmit} />
      </div>
    </div>
  );
 };



const App = () => {

  if(!client){
    return  <LoadingIndicator />;
  }

  // for channel list
  const filters = { 
    type: 'messaging', 
    members: {$in: ['katy']}
  }

  const CustomListItem = (props) => {
    return (
      <ul>
        <li>List Item</li>
      </ul>
    )
  }

  return (
      <Chat client={client} theme='messaging light'>
        <ChannelList filters={filters}  showChannelSearch />
        <Channel >
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput Input={CustomMessageInput}/>
          </Window>
          <Thread />
        </Channel>
      </Chat>
)};

export default App;

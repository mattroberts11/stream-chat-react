import React, {useEffect, useRef} from 'react';
import { StreamChat } from 'stream-chat';
// import { ChatClientProvider, ChatClientContext } from './ChatClientContext';
import { 
  Chat, 
  ChatDown,
  Channel, 
  ChannelHeader, 
  ChannelList, 
  LoadingIndicator,
  LoadingChannels,
  LoadingErrorIndicator,
  MessageInput, 
  MessageList, 
  Thread, 
  Window, 
  // TypingIndicator,
  useChannelStateContext,
  useChatContext,
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


const App = () => {

  if(!client){
    return  <LoadingIndicator />;
  }

  // for channel list
  const filters = { 
    type: 'messaging', 
    members: {$in: ['katy']}
  }


  const CustomList = (props) => {
    

    const { children, error, loading, LoadingErrorIndicator, LoadingIndicator } = props;
  
    if (error) {
      return <LoadingErrorIndicator type={'connection'} />;
    }
  
    if (loading) {
      return <LoadingIndicator />;
    }
  
    return <div>{children}</div>;
  };
  
  const CustomErrorIndicator = (props) => {
    const { text } = props;
  
    return <div>{text}</div>;
  };
  
  const CustomLoadingIndicator = () => {
    return <div>Loading, loading, loading...</div>;
  };
  
  const CustomPreview = (props) => {
    const { channel } = props;
    

    const members = Object.keys(channel.state.members)


    return (
      <div className="str-chat__channel-preview-messenger--name"><span>{members[0]}</span></div>
    )
   }

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

    useEffect( ()=> {
      if(textareaRef){
        textareaRef.current.style.height = '97px';
      }
    })
  
    return (
      <div className='str-chat__input-flat str-chat__input-flat--send-button-active'>
        <div className='str-chat__input-flat-wrapper'>
          <div className='str-chat__input-flat--textarea-wrapper'>
            <div className='str-chat__input-flat-wrapper'>
            </div>
             <ChatAutoComplete />
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

  //  const CustomTextArea = () => {
  //  const {textareaRef} = useMessageInputContext();

  //   useEffect( ()=> {
  //     if(textareaRef){
  //       textareaRef.current.style.height = '97px';
  //     }
  //   })
  // }

  return (
      <Chat client={client} theme='messaging light'>
        <ChannelList filters={filters}  showChannelSearch />
        <Channel Input={CustomMessageInput}>
        {/* <Channel> */}
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
)};

export default App;

import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { ChatClientProvider, ChatClientContext } from './ChatClientContext';
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
} from 'stream-chat-react';

// import { useComponentContext } from 'stream-chat-react';
// import { CustomMessage } from '../src/components/CustomMessage';

import 'stream-chat-react/dist/css/index.css';
import './myAppStyles.css';

const chatClient = StreamChat.getInstance('7qfkkbd7dcrh');

const App = () => {

  

  // const [channels, setChannels] = useState();
  
  // at the very minimum you need this filter to feed to ChannelList component
  // if you don't you'll get a 403 error
  const filters = { 
    type: 'messaging', 
    members: {$in: ['katy']}
  }
  // sort is optional in ChannelList component but you can add it if you want to
  // an example would be if you want to show the channel with the most recent messages first
  const sort = {last_message_at: -1}

  const filters2 = {
    type: 'livestream',
    members: {$in: ['katy']}
  }
  // const chatClient = useContext(ChatClientContext);
  // const [channel, setChannel] = useState('Skiing');
  const userToken = process.env.REACT_APP_TOKEN;

  const getChannels = async () => {
    let channels;
    await chatClient.queryChannels(filters)
      .then( r => console.log("channels", r))
  }

  useEffect(() => {

    const initChat = async () => {
      await chatClient.connectUser(
        {
          id: 'katy',
          name: 'katy',
          image: 'https://getstream.io/random_png/?id=snowy-waterfall-1&name=snowy-waterfall-1',
        },
        userToken,
      )
      .then( r => console.log('CONNECT USER', r))
    }

    initChat(); 
    
      getChannels();
  
    
    // setChannels(channels.data)
  });

  if(!chatClient){
    return  <LoadingIndicator />;
  }

  // const CustomChannelListContainer = (props) => {
  //   // console.log('CHANNELS', channels)
    
  //   return (
  //     <>
        
  //       <div className="str-chat str-chat-channel-list messaging light">
  //         {channels &&
  //           channels.map((channel) => (
  //             <p>{channel}</p>
  //           ))
  //         }
  //       </div>
  //     </>
  //   )
  // }

  const CustomListItem = (props) => {
    return (
      <ul>
        <li>List Item</li>
      </ul>
      
    )
  }
// console.log("CHANNELS", channels)
  return (
    <ChatClientProvider>
      
      <Chat client={chatClient} theme='messaging light'>
      
        <ChannelList filters={filters} sort={sort} showChannelSearch />
        {/* <ChannelList List={CustomChannelListContainer}  /> */}
        {/* <ChannelList filters={filters2} /> */}
        
        {/* <Users /> */}
        <Channel>
          <Window>
            <ChannelHeader />
            {/* <CustomChannelHeader /> */}
            <MessageList />
           
            <MessageInput />
              {/* <QuotedMessagePreview /> 
            </MessageInput> */}
          </Window>
          <Thread />
        </Channel>
      
      </Chat>
    </ChatClientProvider>
  )
};

export default App;

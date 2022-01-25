import React, { useRef } from 'react';
import {
  // Attachment,
  // Avatar,
  messageHasReactions,
  MessageOptions,
  // MessageRepliesCountButton,
  // MessageStatus,
  // MessageText,
  // MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useMessageContext,
} from 'stream-chat-react';
import styled from 'styled-components';

// import './CustomMessage.scss';

export const LighthallMessage = () => {

  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();

  const messageWrapperRef = useRef(null);

  const hasReactions = messageHasReactions(message);
  return (
    <>
      <FlexRowWrapper>
        <FlexRow>
          <SenderText>{message.user.name}</SenderText>
          <MessageText>{message.text}</MessageText>
        </FlexRow>
        <MessageOptions
          displayLeft={false}
          messageWrapperRef={messageWrapperRef}
        />
        {showDetailedReactions && isReactionEnabled && (
          <ReactionSelector ref={reactionSelectorRef} />
        )}
      </FlexRowWrapper>
      {hasReactions && !showDetailedReactions && isReactionEnabled && (
        <SimpleReactionsList />
      )}
    </>
  );
}

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

// const StyledIconButton = styled(IconButton)`
//   height: 8px;
//   width: 8px;
// `;

const SenderText = styled.div`
 
  font-size: 14px;
  color: var(--gray);
  margin-right: 12px;
`;

const MessageText = styled.div`
  
  font-size: 14px;
`;
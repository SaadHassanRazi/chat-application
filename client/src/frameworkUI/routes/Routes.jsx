import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer } from "../exports/Exports";
const apiKey = "1331082";
const client = StreamChat.getInstance(apiKey);
import "./Routes.css";
const Routes = () => {
  return (
    <div>
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
          <ChannelListContainer />
          <ChannelContainer />
        </Chat>
      </div>
    </div>
  );
};

export default Routes;

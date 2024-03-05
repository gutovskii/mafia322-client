import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { CreateRoomModal } from "../../components/CreateRoomModal/CreateRoomModal";
import { useCreateRoomModal } from "../../components/CreateRoomModal/useCreateRoomModal";
import { Rooms } from "../../components/Rooms/Rooms";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import "./GameMenu.scss";

export const GameMenu: React.FC = () => {
  return (
    <div>
      <AppHeader />
      <Layout className="layout">
        <Content className="content">
          <SearchForm />
          <Rooms />
        </Content>
      </Layout>
    </div>
  );
};

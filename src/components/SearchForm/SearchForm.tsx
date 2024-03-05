import { Checkbox, Form, Input } from "antd";
import { useGameMenuStore } from "../../store/gameMenuStore";
import { ITEMS_LIMIT } from "../Rooms/Rooms";
import "./SearchForm.scss";

export interface SearchFormValues {
  search: string;
  allStatuses: boolean;
}

export const SearchForm: React.FC = () => {
  const [state, actions] = useGameMenuStore();
  const [searchForm] = Form.useForm<SearchFormValues>();

  const onFinish = (values: SearchFormValues) => {
    console.log(values);
    actions.findRooms(values, 1, ITEMS_LIMIT);
  };

  return (
    <Form
      className="search-form"
      form={searchForm}
      onFinish={(values: SearchFormValues) => onFinish(values)}
    >
      <Form.Item name="search" labelCol={{ span: 24 }}>
        <Input
          placeholder="Пошук кімнати"
          onInput={(e) => {
            state.search = e.currentTarget.value;
          }}
        />
      </Form.Item>
      <Form.Item name="allStatuses" label="Всі статуси" valuePropName="checked">
        <Checkbox
          onChange={(e) => {
            state.allStatuses = e.target.checked;
            searchForm.submit();
          }}
        />
      </Form.Item>
    </Form>
  );
};

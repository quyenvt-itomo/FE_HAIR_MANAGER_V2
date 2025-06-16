import { Typography } from "antd";
import { PhaseData } from "../../../../../models/operations/phase";
import { useNavigate } from "react-router-dom";
import { privateRoutesName } from "../../../../../constants/routerName";

const { Title } = Typography;

interface GeneralListProps {
  items: PhaseData[];
}

const GeneralList: React.FC<GeneralListProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <Title level={5}>CÔNG ĐOẠN SƠ CHẾ</Title>
      <div
        className="mt-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((stage) => (
          <div
            className="rectangle cursor-pointer rounded-md"
            style={{
              backgroundImage: `url(/images/Topographic.png)`,
            }}
            onClick={() =>
              navigate(
                privateRoutesName.operations.production.page + `?id=${stage.id}`
              )
            }
          >
            <div className="text-box">
              {stage.name.replace("CÔNG ĐOẠN", "").trim()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralList;

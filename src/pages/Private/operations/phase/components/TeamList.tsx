import { Typography } from "antd";
import { PhaseData } from "../../../../../models/operations/phase";
import { useNavigate } from "react-router-dom";
import { privateRoutesName } from "../../../../../constants/routerName";

const { Title } = Typography;

interface TeamListProps {
  items: PhaseData[];
  index: number;
}

const TeamList: React.FC<TeamListProps> = ({ items, index }) => {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <Title level={5}>TỔ SẢN XUẤT {index}</Title>
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
              backgroundImage: `url(/images/Dots.png)`, // Đảm bảo ảnh nằm trong thư mục public
              backgroundColor: "#FF5400",
              backgroundSize: "50%",
              backgroundPosition: "right center", // Căn ảnh về bên phải
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

export default TeamList;

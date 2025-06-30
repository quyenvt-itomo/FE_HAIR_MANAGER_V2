import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { privateRoutesName } from "../../../../constants/routerName";
import { PhaseData } from "../../../../models/operations/phase";
import { usePhaseData } from "../../../../hooks/operations/usePhaseData";

const { Title } = Typography;

const ProductionProcessTable: React.FC = () => {
  const navigate = useNavigate();

  const [GENERAL, setGENERAL] = useState<PhaseData[]>([]);
  const [TEAM_1, setTEAM_1] = useState<PhaseData[]>([]);
  const [TEAM_2, setTEAM_2] = useState<PhaseData[]>([]);

  const { phaseData } = usePhaseData({
    page: 1,
    size: 30,
    getForMe: true,
    onCloseModal: () => {},
  })

  useEffect(() => {
    if (phaseData.length > 0) {
      const generalList = phaseData.filter((item: any) => item.type === "GENERAL");
      const team1List = phaseData.filter((item: any) => item.type === "TEAM_1");
      const team2List = phaseData.filter((item: any) => item.type === "TEAM_2");

      setGENERAL(generalList);
      setTEAM_1(team1List);
      setTEAM_2(team2List);
    }
  }, [phaseData]);

  return (
    <div
      className="h-full bg-white rounded-normal flex flex-col mt-2"
      style={{ height: "calc(100vh - 6rem)" }}
    >
      {GENERAL.length > 0 && (
        <div className="m-4">
          <Title level={5}>CÔNG ĐOẠN SƠ CHẾ</Title>
          <div
            className="container mt-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {GENERAL.map((stage) => (
              <div
                className="rectangle cursor-pointer rounded-md"
                style={{
                  backgroundImage: `url(/images/Topographic.png)`, // Đảm bảo ảnh nằm trong thư mục public
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
      )}
      {TEAM_1.length > 0 && (
        <div className="m-4">
          <Title level={5}>TỔ SẢN XUẤT 1</Title>
          <div
            className="container mt-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {TEAM_1.map((stage) => (
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
      )}
      {TEAM_2.length > 0 && (
        <div className="m-4">
          <Title level={5}>TỔ SẢN XUẤT 2</Title>
          <div
            className="container mt-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {TEAM_2.map((stage) => (
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
      )}
    </div>
  );
};

export default ProductionProcessTable;

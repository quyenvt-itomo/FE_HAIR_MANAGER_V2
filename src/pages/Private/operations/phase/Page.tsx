import React, { useEffect, useState } from "react";
import { PhaseData } from "../../../../models/operations/phase";
import { usePhaseData } from "../../../../hooks/operations/usePhaseData";
import GeneralList from "./components/GeneralList";
import TeamList from "./components/TeamList";
import { CSS } from "../../../../constants/UI";
import './index.css'

const PhasePage: React.FC = () => {
  const [GENERAL, setGENERAL] = useState<PhaseData[]>([]);
  const [TEAM_1, setTEAM_1] = useState<PhaseData[]>([]);
  const [TEAM_2, setTEAM_2] = useState<PhaseData[]>([]);

  const { phaseData } = usePhaseData({
    page: 1,
    size: 50,
    getForMe: true,
    onCloseModal: () => {},
  });

  useEffect(() => {
    if (phaseData.length > 0) {
      const generalList = phaseData.filter(
        (item: any) => item.type === "GENERAL"
      );
      const team1List = phaseData.filter((item: any) => item.type === "TEAM_1");
      const team2List = phaseData.filter((item: any) => item.type === "TEAM_2");

      setGENERAL(generalList);
      setTEAM_1(team1List);
      setTEAM_2(team2List);
    }
  }, [phaseData]);

  return (
    <div
      className="h-full bg-white rounded-normal overflow-y-auto flex flex-col"
      style={CSS.container}
    >
      {GENERAL.length > 0 && <GeneralList items={GENERAL} />}
      {TEAM_1.length > 0 && <TeamList index={1} items={TEAM_1} />}
      {TEAM_2.length > 0 && <TeamList index={2} items={TEAM_2} />}
    </div>
  );
};

export default PhasePage;

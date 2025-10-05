const PhaseSelector = ({ phases, selectedPhase, onPhaseSelect }) => {
  if (!phases) {
    return <span></span>;
  }

  return (
    <ul className="w-full flex gap-8 py-2 overflow-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
      {phases.map((phase) => (
        <li
          key={phase}
          onClick={() => onPhaseSelect(phase)}
          className={`text-2xl lg:text-3xl cursor-pointer hover:text-secondary animation-colors duration-300  whitespace-nowrap ${
            selectedPhase === phase ? 'text-secondary' : 'text-secondary/70'
          }`}
        >
          {phase}
        </li>
      ))}
    </ul>
  );
};

export default PhaseSelector;

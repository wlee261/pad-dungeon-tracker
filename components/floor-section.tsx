"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { NewEncounterForm } from "./new-encounter-form";

interface FloorSectionProps {
  floorNum: number;
}
// on add encounter, encounter form should be shown, add encoutner button disabled until fomr is saved
// on form save, new encoutner section with data should be added, button reenabled

export const FloorSection = ({ floorNum }: FloorSectionProps) => {
  const [isAddingNewEncounter, setIsAddingNewEncounter] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  // handlers for saving, and altering elements of encounter in NewEncounterForm
  const handleSaveEncounter = () => {
    setIsAddingNewEncounter(false);
    // TODO: create new encounter with types of selected elements
    setSelectedElements([]);
  };

  const handleSelectElement = (element: string) => {
    setSelectedElements([...selectedElements, element]);
  };

  const handleRemoveElement = (element: string) => {
    const arrayWithRemovedElement = selectedElements.filter(
      (selectedElement) => selectedElement !== element,
    );
    setSelectedElements([...arrayWithRemovedElement]);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h3>Floor {floorNum}</h3>
        <Button
          onClick={() => setIsAddingNewEncounter(true)}
          disabled={isAddingNewEncounter}
        >
          Add Encounter
        </Button>
      </div>
      {isAddingNewEncounter && (
        <NewEncounterForm
          selectedElements={selectedElements}
          handleSaveEncounter={handleSaveEncounter}
          handleSelectElement={handleSelectElement}
          handleRemoveElement={handleRemoveElement}
        />
      )}
    </div>
  );
};

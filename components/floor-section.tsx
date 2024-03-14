"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { NewEncounterForm } from "./new-encounter-form";
import { EncounterSection } from "./encounter-section";

// TODO: add duplicate check on attributes
// TODO: delete encounter

interface FloorSectionProps {
  floorNum: number;
}
// on add encounter, encounter form should be shown, add encoutner button disabled until fomr is saved
// on form save, new encoutner section with data should be added, button reenabled

export const FloorSection = ({ floorNum }: FloorSectionProps) => {
  const [isAddingNewEncounter, setIsAddingNewEncounter] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  // list of encounter's attributes
  const [encounters, setEncounters] = useState<string[][]>([]);

  // handlers for saving, and altering attributes of encounter in NewEncounterForm
  const handleSaveEncounter = () => {
    setIsAddingNewEncounter(false);
    selectedAttributes.length &&
      setEncounters([...encounters, selectedAttributes]);
    setSelectedAttributes([]);
  };

  const handleSelectElement = (element: string) => {
    setSelectedAttributes([...selectedAttributes, element]);
  };

  const handleRemoveElement = (element: string) => {
    const arrayWithRemovedElement = selectedAttributes.filter(
      (selectedElement) => selectedElement !== element,
    );
    setSelectedAttributes([...arrayWithRemovedElement]);
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
          selectedAttributes={selectedAttributes}
          handleSaveEncounter={handleSaveEncounter}
          handleSelectElement={handleSelectElement}
          handleRemoveElement={handleRemoveElement}
        />
      )}
      {encounters.map((encounterAttributes) => (
        <EncounterSection attributes={encounterAttributes} />
      ))}
    </div>
  );
};

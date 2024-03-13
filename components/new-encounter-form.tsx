"use client";

import { Button } from "./ui/button";

// constants file at some point
const elements = ["Fire", "Water", "Grass", "Light", "Dark"];

interface NewEncounterFormProps {
  selectedElements: string[];
  handleSaveEncounter: () => void;
  handleSelectElement: (element: string) => void;
  handleRemoveElement: (element: string) => void;
}

export const NewEncounterForm = ({
  selectedElements,
  handleSaveEncounter,
  handleSelectElement,
  handleRemoveElement,
}: NewEncounterFormProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2>Choose Element of Encounter (left to right)</h2>
      <div>
        {elements.map((element) => (
          <Button
            className="m-1"
            onClick={(e) => {
              if (selectedElements.length < 2) {
                const elementButton = e.target as HTMLButtonElement;
                handleSelectElement(elementButton.innerText);
              }
            }}
          >
            {element}
          </Button>
        ))}
      </div>
      <div className="h-14">
        {selectedElements.map((selectedElement) => {
          return (
            <Button
              className="m-1"
              onClick={(e) => {
                const elementButton = e.target as HTMLButtonElement;
                handleRemoveElement(elementButton.innerText);
              }}
            >
              {selectedElement}
            </Button>
          );
        })}
      </div>
      <Button onClick={handleSaveEncounter}>Save</Button>
    </div>
  );
};

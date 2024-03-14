"use client";

import { Button } from "./ui/button";

// constants file at some point
const attributes = ["Fire", "Water", "Grass", "Light", "Dark"];

interface NewEncounterFormProps {
  selectedAttributes: string[];
  handleSaveEncounter: () => void;
  handleSelectElement: (element: string) => void;
  handleRemoveElement: (element: string) => void;
}

export const NewEncounterForm = ({
  selectedAttributes,
  handleSaveEncounter,
  handleSelectElement,
  handleRemoveElement,
}: NewEncounterFormProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2>Choose Element of Encounter (left to right)</h2>
      <div>
        {attributes.map((element) => (
          <Button
            key={element}
            className="m-1"
            onClick={(e) => {
              if (selectedAttributes.length < 2) {
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
        {selectedAttributes.map((selectedElement) => {
          return (
            <Button
              key={selectedElement}
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
      <Button onClick={handleSaveEncounter}>
        {selectedAttributes.length ? "Save" : "Cancel"}
      </Button>
    </div>
  );
};

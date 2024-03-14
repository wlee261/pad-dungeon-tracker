import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface EncounterSectionProps {
  attributes: string[];
}

interface EnemyActionType {
  actionTrigger: string;
  enemyAction: string;
  turns?: number;
}

// TODO: move to constants file
const hazards = [
  "Damage Absorb",
  "Damage Void",
  "Attr Absorb",
  "Awoken Bind",
  "Assist Bind",
  "Rcv Debuff",
  "Monster Atk Debuff",
  "Attr Atk Debuff",
  "Skill Delay",
  "Spinner",
];

const triggers = [
  "Preemptive",
  "Super Resolve Break",
  "Regular Atk",
  "Execute (turns passed)",
  "Execute (hp threshold)",
];

const EnemyMovesetFormSchema = z.object({
  enemyAction: z.string({
    required_error: "Please select an enemy action",
  }),
  actionTrigger: z.string({
    required_error: "Please select an action trigger",
  }),
  turns: z.coerce.number().optional(),
});

export const EncounterSection = ({ attributes }: EncounterSectionProps) => {
  const [enemyActionsList, setEnemyActionsList] = useState<EnemyActionType[]>(
    [],
  );

  // zod forms
  const enemyMovesetForm = useForm<z.infer<typeof EnemyMovesetFormSchema>>({
    resolver: zodResolver(EnemyMovesetFormSchema),
  });

  const onSubmit = (data: z.infer<typeof EnemyMovesetFormSchema>) => {
    console.log(data);
    setEnemyActionsList([...enemyActionsList, data]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>
        {/* if 2 attributes then show att / att, otherwise show att */}
        {attributes.map((attribute, index) =>
          index === 1 ? `/${attribute}` : attribute,
        )}
      </h3>
      {/*TODO: could be own component, this div is the add to enemy moveset form */}
      <Form {...enemyMovesetForm}>
        <form
          onSubmit={enemyMovesetForm.handleSubmit(onSubmit)}
          className="my-4 flex items-center justify-center"
        >
          <FormField
            control={enemyMovesetForm.control}
            name="actionTrigger"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an Action Trigger</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="m-3 w-[200px]">
                    <SelectValue placeholder="Action Trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggers.map((trigger) => (
                      <SelectItem key={trigger} value={trigger.toLowerCase()}>
                        {trigger}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={enemyMovesetForm.control}
            name="enemyAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an Enemy Action</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="m-3 w-[180px]">
                      <SelectValue placeholder="Enemy Action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hazards.map((hazard) => (
                      <SelectItem key={hazard} value={hazard.toLowerCase()}>
                        {hazard}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={enemyMovesetForm.control}
            name="turns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Number of Turns</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="ml-3 w-20"
                    placeholder="Turns"
                    min="0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-4 mt-6">
            Add
          </Button>
        </form>
      </Form>
      {/* TODO: this can be a separate table component as well */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trigger</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Turns</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enemyActionsList.map((enemyAction) => {
            return (
              <TableRow
                key={`${enemyAction.actionTrigger}-${enemyAction.enemyAction}`}
              >
                <TableCell>{enemyAction.actionTrigger}</TableCell>
                <TableCell>{enemyAction.enemyAction}</TableCell>
                <TableCell>{enemyAction?.turns}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

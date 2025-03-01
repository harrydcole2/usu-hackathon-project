"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ReceiptData, useCreateReceipt } from "@/endpoints/receipt";

// @ts-expect-error
const ReceiptModal = ({ setIsOpen, isOpen }) => {
  const { mutate } = useCreateReceipt();
  const [receipt, setReceipt] = useState<ReceiptData>({
    name: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Receipt submitted:", receipt);
    // Do the create receipt thing here
    mutate(receipt, {
      onSuccess: () => {
        setIsOpen(false);
        // Reset form
        setReceipt({ name: "", date: "" });
      },
      onError: (error) => {
        console.error("Error creating receipt:", error);
      },
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 pointer-events-auto"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Add New Receipt</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Receipt Name</Label>
                      <Input
                        id="name"
                        value={receipt.name}
                        onChange={(e) => setReceipt({ ...receipt, name: e.target.value })}
                        placeholder="Enter receipt name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Receipt Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !receipt.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {receipt.date ? format(receipt.date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={receipt.date}
                            onSelect={(date) => setReceipt({ ...receipt, date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Receipt</Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceiptModal;

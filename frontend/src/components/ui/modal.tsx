import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddFoodItem } from "../../endpoints/foodItem";
import { useGetUserReceipts } from "../../endpoints/receipt";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const { mutate: addFoodItem, isPending, isError, error } = useAddFoodItem();
  const { data: receipts, isLoading, isError: receiptError } = useGetUserReceipts();

  const [selectedReceipt, setSelectedReceipt] = useState<string | "">("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [receiptDate, setReceiptDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReceiptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const receiptId = e.target.value;  // No need to convert to a number if it's already a string
  
    console.log("Selected receipt ID:", receiptId);
    
    setSelectedReceipt(receiptId);
    
    // Log the receipts data
    console.log("Receipts data:", receipts);
    
    // Log the receipts array
    console.log("Receipts array:", receipts?.receipts);
    
    // Find the selected receipt
    const selectedReceiptObj = receipts.receipts.find(receipt => {
      console.log("Checking receipt:", receipt.id, receipt.date);
      console.log("Type of receipt.id:", typeof receipt.id, "Type of receiptId:", typeof receiptId);
      return receipt.id === receiptId;  // Both are strings, so no need for type conversion
    });
    
    if (selectedReceiptObj) {
      console.log("Found receipt:", selectedReceiptObj);
      setReceiptDate(new Date(selectedReceiptObj.date));
    } else {
      console.error("Receipt not found for ID:", receiptId);
    }
  };

  const handleSubmit = async () => {
    setSubmissionError(null);
    const missingFields = [];

    if (!itemName) missingFields.push("Item Name");
    if (!unit) missingFields.push("Unit");
    if (!receiptDate) missingFields.push("Receipt Date");
    if (!expirationDate) missingFields.push("Expiration Date");
  
    if (missingFields.length > 0) {
      setSubmissionError(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    if (quantity <= 0) {
      setSubmissionError("Quantity must be greater than zero.");
      return;
    }

    if (expirationDate <= receiptDate) {
      setSubmissionError("Expiration date must be after the receipt date.");
      return;
    }

    try {
      await addFoodItem(
        {
          item_name: itemName,
          quantity,
          unit,
          receipt_id: selectedReceipt ? Number(selectedReceipt) : undefined, // Convert to number
          receipt_date: receiptDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
          expiration_date: expirationDate.toISOString().split("T")[0],
        },
        {
          onSuccess: () => {
            onClose(); // Close the modal on success
          },
          onError: (err: any) => {
            setSubmissionError(err.message || "Failed to add food item.");
          },
        }
      );
      
    } catch (err: any) {
      setSubmissionError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center backdrop-blur-md z-50">
      <div className="bg-[#C9D6EA] rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#2C3B3C]">Add Item</h2>
        <p className="text-[#2C3B3C] mb-4">Enter details for the new receipt.</p>

         {/* Select Receipt */}
         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Receipt:</label>
            <select
              className="border w-full p-2 rounded"
              value={selectedReceipt}
              onChange={handleReceiptChange}
              disabled={isLoading}
              required
            >
              <option value="">Select a Receipt</option>
              {!isLoading &&
                receipts?.receipts.map((receipt) => (
                  <option key={receipt.id} value={receipt.id}>
                    {receipt.name} : {receipt.date}
                  </option>
                ))}
            </select>
            {receiptError && <p className="text-red-500 mt-1">Failed to load receipts.</p>}
          </div>



        {/* Item Name Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Item:</label>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border w-full p-2 rounded mb-4"
          required
        />

        {/* Quantity Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border w-full p-2 rounded mb-4"
          required
        />

        {/* unit Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit:</label>
        <input
          type="text"
          name="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit (e.g., kg, lb)"
          className="border w-full p-2 rounded mb-4"
          required
        />

       

        {/* Expiration Date Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date:</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            dateFormat="MM/dd/yyyy"
            className="border w-full p-2 rounded"
            placeholderText="MM/DD/YYYY"
            required
          />
        </div>

        {/* Add Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>

        {/* Error Messages */}
        {submissionError && <p className="text-red-500 mt-2">{submissionError}</p>}
        {isError && <p className="text-red-500 mt-2">Error: {error?.message}</p>}
      </div>
    </div>
  );
};

export default Modal;

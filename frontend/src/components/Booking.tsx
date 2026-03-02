// Booking.tsx (Updated with better mobile responsiveness)

import { useMemo, useState } from "react";
import { useCreateOrderMutation } from "../slices/orderApiSlice";

type PaymentMethod = "crypto" | "giftcard";

type Plan = {
  id: "basic" | "standard" | "premium";
  label: string;
  duration: string;
  price: number;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  { id: "basic", label: "Standard Session", duration: "5 Hours", price: 100 },
  { id: "standard", label: "Premium Session", duration: "10 Hours", price: 250, highlight: true },
  { id: "premium", label: "Overnight", duration: "12+ Hours", price: 500 },
];

// BNB Smart Chain (BEP-20) wallet address - UPDATE THIS WITH YOUR ACTUAL ADDRESS
const BNB_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const BNB_NETWORK = "BNB Smart Chain (BEP-20)";

const Booking: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modeOfPayment, setModeOfPayment] = useState<PaymentMethod | "">("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Optional for user reference only (NOT sent to backend unless you add field later)
  const [transactionHash, setTransactionHash] = useState("");

  // Upload field for receipt image
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const canSubmit = useMemo(() => {
    if (!selectedPlan) return false;
    if (!modeOfPayment) return false;
    if (!name.trim() || !email.trim()) return false;
    if (!receiptFile) return false;
    return true;
  }, [selectedPlan, modeOfPayment, name, email, receiptFile]);

  // Handle file selection + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setReceiptFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }
  };

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(BNB_WALLET_ADDRESS);
      setCopySuccess("Wallet address copied! ✅");
      setTimeout(() => setCopySuccess(null), 3000);
    } catch {
      setFormError("Could not copy wallet address. Please copy manually.");
    }
  };

  // Display-only BNB amount (NOT used for backend)
  const getBnbAmount = () => {
    if (!selectedPlan) return "0";
    const bnbValue = selectedPlan.price / 400; // adjust if you want
    return bnbValue.toFixed(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!selectedPlan) return setFormError("Please select a package.");
    if (!modeOfPayment) return setFormError("Please select a payment method.");
    if (!name.trim() || !email.trim()) return setFormError("Name and email are required.");
    if (!receiptFile) return setFormError("Please upload your receipt image.");

    // ✅ IMPORTANT: Must be FormData because you're uploading a file
    const formData = new FormData();

    // ✅ Match backend schema fields
    formData.append("name", name.trim());
    formData.append("email", email.trim().toLowerCase());
    formData.append("modeOfPayment", modeOfPayment);
    formData.append("amountPaid", String(selectedPlan.price));

    // ✅ MUST match multer: upload.single("receipt")
    formData.append("receipt", receiptFile);

    try {
      const response = await createOrder(formData).unwrap();

      setSuccessMsg("Booking submitted successfully! ✅");

      // Reset form
      setSelectedPlan(null);
      setModeOfPayment("");
      setTransactionHash("");
      setReceiptFile(null);
      setReceiptPreview(null);
      setName("");
      setEmail("");

      console.log("Order created:", response);
    } catch (err: any) {
      setFormError(err?.data?.message || err?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <section
      id="booking"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Reserve Your Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mt-2">
            Book{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Linda Ella
            </span>
          </h2>
          <p className="mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Complete the form below to secure your private time. All information is kept strictly confidential.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* LEFT: Plan Selection & Payment Method */}
          <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6 flex items-center gap-2">
              <span className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white flex items-center justify-center text-xs md:text-sm">
                1
              </span>
              Select Your Package
            </h3>

            {/* Mobile-friendly plan cards - stack on mobile, grid on larger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {PLANS.map((plan) => {
                const active = selectedPlan?.id === plan.id;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative rounded-xl md:rounded-2xl p-4 md:p-5 border-2 text-left transition-all duration-300 ${
                      active
                        ? "border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                        : plan.highlight
                        ? "border-purple-200 bg-white hover:border-purple-400 hover:shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {plan.highlight && !active && (
                      <span className="absolute -top-2 right-2 md:-top-3 md:right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                        Popular
                      </span>
                    )}
                    <p className={`text-xs md:text-sm font-medium ${active ? "text-purple-700" : "text-gray-600"}`}>
                      {plan.label}
                    </p>
                    <p className={`text-[10px] md:text-xs ${active ? "text-purple-600" : "text-gray-500"}`}>{plan.duration}</p>
                    <p className={`mt-2 md:mt-3 text-xl md:text-2xl font-bold ${active ? "text-purple-700" : "text-gray-900"}`}>
                      ${plan.price}
                    </p>
                  </button>
                );
              })}
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6 flex items-center gap-2">
              <span className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white flex items-center justify-center text-xs md:text-sm">
                2
              </span>
              Payment Method
            </h3>

            {/* Payment method buttons - side by side on mobile */}
            <div className="flex flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <button
                type="button"
                onClick={() => setModeOfPayment("giftcard")}
                className={`flex-1 px-3 md:px-6 py-3 md:py-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                  modeOfPayment === "giftcard"
                    ? "border-purple-600 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-400"
                }`}
              >
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  <span className="text-xs md:text-sm">Gift Card</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModeOfPayment("crypto")}
                className={`flex-1 px-3 md:px-6 py-3 md:py-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                  modeOfPayment === "crypto"
                    ? "border-purple-600 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-400"
                }`}
              >
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-2.5 0-5 1.5-5 4s2.5 4 5 4 5-1.5 5-4-2.5-4-5-4zm0 6c-2.2 0-4-1.3-4-3s1.8-3 4-3 4 1.3 4 3-1.8 3-4 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l2 2M18 18l2 2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20l2-2M18 6l2-2" />
                  </svg>
                  <span className="text-xs md:text-sm">Crypto</span>
                </div>
              </button>
            </div>

            {/* Crypto Payment Details - Appears when crypto is clicked */}
            {modeOfPayment === "crypto" && selectedPlan && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 animate-fadeIn">
                <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Send BNB (BEP-20)</h4>

                <div className="bg-white rounded-xl p-3 md:p-4 mb-4 border border-purple-100">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Amount to send:</p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-700 break-words">{getBnbAmount()} BNB</p>
                  <p className="text-xs md:text-sm text-gray-500">≈ ${selectedPlan.price} USD</p>
                </div>

                <p className="text-xs md:text-sm text-gray-600 mb-2">Wallet Address (BEP-20):</p>
                
                {/* Mobile-friendly wallet address display */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
                  <div className="flex-1 bg-white border border-purple-200 rounded-xl p-3 overflow-x-auto">
                    <code className="text-xs break-all font-mono">
                      {BNB_WALLET_ADDRESS}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={copyWallet}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md text-sm sm:w-auto w-full"
                  >
                    Copy Address
                  </button>
                </div>
                
                {/* Copy success message */}
                {copySuccess && (
                  <p className="text-xs text-green-600 mb-2 font-medium">{copySuccess}</p>
                )}

                <p className="text-xs md:text-sm text-gray-600">
                  Network: <span className="font-semibold text-purple-700 break-words">{BNB_NETWORK}</span>
                </p>

                <div className="mt-4 md:mt-6">
                  <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-2">
                    Transaction Hash (TxID)
                    <span className="text-gray-500 font-normal ml-1 md:ml-2 text-xs">(optional)</span>
                  </label>
                  <input
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    placeholder="Paste transaction hash here"
                    className="w-full rounded-xl border border-purple-200 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  />
                  <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-500">Not required for booking confirmation.</p>
                </div>
              </div>
            )}

            {/* Gift Card Note */}
            {modeOfPayment === "giftcard" && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Gift Card Payment</h4>
                </div>
                <p className="text-xs md:text-sm text-gray-700">
                  Please upload a clear photo of your gift card. Accepted: Visa, Mastercard, Amazon, iTunes, Google Play.
                </p>
                {selectedPlan && (
                  <p className="mt-2 md:mt-3 text-xs md:text-sm text-purple-700 font-semibold">
                    Amount: ${selectedPlan.price} - {selectedPlan.label}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Personal Details & Upload */}
          <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6 flex items-center gap-2">
              <span className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white flex items-center justify-center text-xs md:text-sm">
                3
              </span>
              Your Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5 md:mb-2">
                    Full Name <span className="text-pink-600">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-purple-200 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5 md:mb-2">
                    Email Address <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-purple-200 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    required
                  />
                </div>

                {/* Selected plan info */}
                {selectedPlan && (
                  <div className="bg-purple-50 rounded-xl p-3 md:p-4 border border-purple-200">
                    <p className="text-xs text-gray-600">Selected Package:</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {selectedPlan.label} - {selectedPlan.duration}
                    </p>
                    <p className="text-base md:text-lg font-bold text-purple-700 mt-1">Amount: ${selectedPlan.price}</p>
                  </div>
                )}
              </div>

              {/* Upload Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                <label className="block text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4">
                  Upload Receipt Image <span className="text-pink-600">*</span>
                </label>

                <div className="mt-2 flex justify-center px-4 md:px-6 pt-4 md:pt-5 pb-4 md:pb-6 border-2 border-purple-200 border-dashed rounded-xl bg-white">
                  <div className="space-y-2 text-center">
                    <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="flex flex-col sm:flex-row text-xs md:text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-semibold text-purple-600 hover:text-purple-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                      <p className="sm:pl-1">or drag and drop</p>
                    </div>

                    <p className="text-[10px] md:text-xs text-gray-500">PNG, JPG, JPEG, WEBP up to 10MB</p>
                  </div>
                </div>

                {/* Preview uploaded image */}
                {receiptPreview && (
                  <div className="mt-3 md:mt-4">
                    <div className="relative rounded-xl overflow-hidden border border-purple-200">
                      <img src={receiptPreview} alt="Receipt preview" className="max-h-32 md:max-h-48 w-full object-cover" />
                    </div>
                    <p className="mt-1 md:mt-2 text-xs text-green-700 font-medium flex items-center gap-1 break-all">
                      <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {receiptFile?.name}
                    </p>
                  </div>
                )}

                <p className="mt-2 md:mt-3 text-[10px] md:text-xs text-gray-500">
                  {modeOfPayment === "crypto"
                    ? "Upload a screenshot of your transaction confirmation."
                    : "Upload a clear photo of your gift card."}
                </p>
              </div>

              {/* Messages */}
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-red-700">
                  {formError}
                </div>
              )}

              {successMsg && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-green-700">
                  {successMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit || isLoading}
                className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 ${
                  !canSubmit || isLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-600/30 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <p className="text-[10px] text-center text-gray-400">
                ✅ Sends: name, email, modeOfPayment, amountPaid, receipt
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS file or in a style tag */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Booking;
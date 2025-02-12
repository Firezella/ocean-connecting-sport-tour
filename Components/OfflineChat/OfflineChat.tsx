"use client";

import {
  LuSend,
  LuChevronDown,
  LuCornerLeftDown,
  LuMessageCircle,
  LuRotateCw,
} from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import offlineChatbotDataArray from "./Data";
import Button from "../Button";

interface DropdownOption {
  value: string;
  label: string;
}

function OfflineChat() {
  const [availableQuestions, setAvailableQuestions] = useState<
    DropdownOption[]
  >(
    offlineChatbotDataArray.map((q) => ({
      value: q.id.toString(),
      label: q.question,
    }))
  );
  const [conversation, setConversation] = useState<
    { type: "bot" | "user"; content: string }[]
  >([{ type: "bot", content: "Hello! How can I help you today?" }]);
  const [toggle, setToggle] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatEndRef]); //Corrected dependency

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function Message({
    type,
    content,
  }: {
    type: "user" | "bot";
    content: string;
  }) {
    return (
      <div
        className={`max-w-[80%] ${
          type === "user" ? "ml-auto" : "mr-auto"
        } mb-2`}
      >
        <div
          className={`p-3 rounded-lg ${
            type === "user"
              ? "bg-primary-500 text-text-50"
              : "bg-background-200 text-text-800"
          }`}
        >
          {content}
        </div>
      </div>
    );
  }

  function resetChat() {
    setConversation([
      { type: "bot", content: "Hello! How can I help you today?" },
    ]);
    setAvailableQuestions(
      offlineChatbotDataArray.map((q) => ({
        value: q.id.toString(),
        label: q.question,
      }))
    );
  }

  function addQuestion(question: string) {
    const selectedQuestion = offlineChatbotDataArray.find(
      (q) => q.question === question
    );
    if (!selectedQuestion) return;

    setConversation((prev) => [
      ...prev,
      { type: "user", content: selectedQuestion.question },
      {
        type: "bot",
        content:
          selectedQuestion.answer ||
          "I'm sorry, I don't have an answer for that.",
      },
    ]);

    if (selectedQuestion.followUp) {
      const newQuestions = offlineChatbotDataArray
        .filter((q) => selectedQuestion.followUp?.includes(q.id))
        .map((q) => ({ value: q.id.toString(), label: q.question }));
      setAvailableQuestions(newQuestions);
    } else {
      setAvailableQuestions([]);
    }
    setSelectedQuestion(null);
    setIsDropdownOpen(false);
  }

  return (
    <div className="fixed bottom-12 gap-2 justify-center flex flex-col -right-1 z-50 m-6">
      {toggle && (
        <div className="w-80 h-[32rem] flex flex-col rounded-lg shadow-lg bg-background-50 overflow-hidden">
          <div className="bg-primary-600 flex gap-2 items-center text-text-50 p-4">
            <h2 className="text-xl flex-1 font-semibold">Chat Support</h2>
            <div className="group" onClick={() => resetChat()}>
              <LuRotateCw size={25} className="group-hover:rotate-180" />
            </div>
            <div onClick={() => setToggle(false)}>
              <LuCornerLeftDown size={25} className=" cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {conversation.map((message, idx) => (
              <Message
                key={idx}
                type={message.type}
                content={message.content}
              />
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-background-300">
            {availableQuestions.length > 0 ? (
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <button
                    className="w-full p-2 border border-background-200 rounded-lg bg-background-50 flex items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <LuChevronDown
                      className={`text-text-500 mx-1 transition-transform duration-200 ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                    <span className="text-text-700 truncate">
                      {selectedQuestion || "Choose a question..."}
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-background-50 border border-background-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {availableQuestions.map((q) => (
                        <div
                          key={q.value}
                          className="p-2 hover:bg-background-100 cursor-pointer"
                          onClick={() => {
                            setSelectedQuestion(q.label);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {q.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500 p-3 bg-background-50 bg-opacity-65 hover:text-primary-600 transition-colors duration-200"
                  onClick={() =>
                    selectedQuestion && addQuestion(selectedQuestion)
                  }
                >
                  <LuSend />
                </button>
              </div>
            ) : (
              <Button variant="primary" onClick={() => resetChat()}>
                <LuRotateCw />
                new chat
              </Button>
            )}
          </div>
        </div>
      )}
      {!toggle && (
        <button
          onClick={() => setToggle(!toggle)}
          className="bg-primary-500 absolute right-0 bottom-0 hover:bg-primary-600 text-white w-12 h-12 flex justify-center items-center rounded-full shadow-lg transition-colors duration-200"
        >
          <LuMessageCircle size={24} />
        </button>
      )}
    </div>
  );
}

export default OfflineChat;

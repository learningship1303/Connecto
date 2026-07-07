import {
  Check,
  CheckCheck,
  Clock3,
  AlertCircle,
} from "lucide-react";

const MessageStatus = ({
  status = "sent",
}) => {

  switch (status) {

    case "sending":
      return (
        <Clock3
          size={14}
          className="text-slate-400"
        />
      );

    case "sent":
      return (
        <Check
          size={15}
          className="text-slate-400"
        />
      );

    case "delivered":
      return (
        <CheckCheck
          size={15}
          className="text-slate-400"
        />
      );

    case "read":
      return (
        <CheckCheck
          size={15}
          className="text-sky-400"
        />
      );

    case "failed":
      return (
        <AlertCircle
          size={15}
          className="text-red-500"
        />
      );

    default:
      return null;
  }

};

export default MessageStatus;
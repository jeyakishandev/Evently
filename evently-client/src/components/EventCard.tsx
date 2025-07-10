type EventProps = {
  id: number;
  title: string;
  desc: string;
  place: string;
  date: string;
  image: string;
};

const EventCard = ({ title, desc, place, date, image }: EventProps) => {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">
        {place} - {new Date(date).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  );
};

export default EventCard;

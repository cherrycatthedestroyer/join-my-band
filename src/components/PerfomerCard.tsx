import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useWindowDimensions, {
  cardButtonStyling,
  SubmissionProfile,
} from "../../scripts/helper";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

interface ItemProps extends PropsFromRedux {
  item: SubmissionProfile;
  item_index: string;
}

const PerformerCard: React.FC<ItemProps> = ({ item, item_index }) => {
  let { width } = useWindowDimensions();
  const router = useRouter();
  function routeToSubmissionPage() {
    router.push("/" + item_index);
  }
  return (
    <Container
      className="mt-4 bg-white shadow-md rounded mb-2 flex cursor-pointer hover:bg-stone-100"
      onClick={() => routeToSubmissionPage()}
      sx={{ display: "flex" }}
      disableGutters
    >
      <div className="rounded-l relative w-2/5">
        <img
          src={
            item.personal.image.value != ""
              ? item.personal.image.value
              : "/test-profile.png"
          }
          alt="test-picture"
          className="rounded-l z-0 object-cover"
        />

        <div>
          <div className="absolute bg-gradient-to-t from-black from-5% via-transparent via-50% w-full h-full top-0 opacity-70" />
          <div className="z-40 absolute left-0 bottom-0 p-4 flex gap-2">
            {parseInt(item.likes) > 0 ? (
              <div className="flex gap-1">
                <FavoriteIcon fontSize="small" style={{ color: "#ffff" }} />
                <p className="text-xs self-center text-white">{item.likes}</p>
              </div>
            ) : undefined}
            {item.comments !== undefined ? (
              <div className="flex gap-1">
                <ChatBubbleIcon fontSize={"small"} style={{ color: "#ffff" }} />
                <p className="text-xs self-center text-white">
                  {item.comments.length}
                </p>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2 px-4 md:py-4">
        <h2 className="text-stone-700 text-base font-semibold mb-2 lg:text-2xl xl:text-4xl xl:mb-4 text-nowrap">
          {item.personal.performer_name.value}
        </h2>
        <div className="flex flex-col text-xs md:scale-100 lowercase text-slate-500 mb-2">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={10}
              height={10}
              className="self-center"
            >
              <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z" />
            </svg>
            <p>{item.personal.age.value + " years old "}</p>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={10}
              height={10}
              className="self-center"
            >
              <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
            </svg>
            <p>{"travels by " + item.personal.transport.value}</p>
          </div>
          {width > 768 && (
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={10}
                height={10}
                className="self-center"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <p>{item.personal.contact.value}</p>
            </div>
          )}
        </div>
        <div className="lowercase text-stone-600 text-xs font-normal mb-4 xl:text-base">
          <span>
            {`plays ${
              width < 678
                ? ""
                : item.instruments[0].instrument_profeciency.value
            }`}
          </span>
          <span className="font-bold">
            {" " + item.instruments[0].instrument_name.value}
          </span>
          {item.instruments.length > 1 ? (
            <span>{" and +" + (item.instruments.length - 1)}</span>
          ) : undefined}
        </div>

        <div className="hidden md:block">
          <ul className="flex flex-wrap gap-2">
            {item.achievements[0].achievement_name.value.trim().length > 0 ? (
              <li className={cardButtonStyling + " max-w-10 md:max-w-32"}>
                <p className="truncate">
                  {item.achievements[0].achievement_name.value}
                </p>
              </li>
            ) : undefined}
            {item.achievements.length > 1 ? (
              <li className={cardButtonStyling + " max-w-32"}>
                <p className="truncate">
                  {"+ " + (item.achievements.length - 1)}
                </p>
              </li>
            ) : undefined}
          </ul>
        </div>
      </div>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PerformerCard);



interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img src={props.src} alt={props.alt} className="w-full h-full object-cover" />
    </div>
  )
}

export default Avatar;

interface Props {
  name: string;
  className?: string;
}

export const FoomAvatarImage = ({ name, className }: Props) => {
  return <img src={getAvatarImagePath(name)} alt={name} className={className} />
}

const getAvatarImagePath = (name: string) => {
  return `/avatars/${name}/${name}.png`;
}
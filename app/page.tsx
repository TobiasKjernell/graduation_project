
export default function Home() {
  return (
    <div>Landing page

      <form>
        <label>Email</label>
        <input type='email' required />
        <label>Password </label>
        <input type='password' required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

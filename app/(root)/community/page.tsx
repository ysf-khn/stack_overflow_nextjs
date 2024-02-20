import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/navbar/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const result = await getUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <div key={user.name}>{user.name}</div>)
        ) : (
          <div>No users yet</div>
        )}
      </section>
    </>
  );
};

export default Page;

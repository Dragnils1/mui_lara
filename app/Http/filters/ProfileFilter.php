<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class ProfileFilter extends AbstractFilter
{
    public const ID = 'id';
    public const ID_IN = 'id_in';
    public const TITLE = 'title';
    public const CONTENT = 'content';
    public const CATEGORY_ID = 'category_id';
    public const STATUS = 'status';
    public const STATUS_NOT = 'status_not';
    public const STATUSES = 'statuses';
    public const STATUS_IN = 'status_in';
    public const NOT_FAV_DATE = 'not_fav_date';
    public const VIP = 'vip';
    public const ROLE = 'role';
    public const ORDER_BY = 'order_by';
    public const ORDER_BY_DESC = 'order_by_desc';
    public const TARGETSEARCH = 'targetsearch';
    public const LANGLOVE2 = 'langlove2';
    public const LANGLOVE = 'langlove';

    protected function getCallbacks(): array
    {
        return [
            self::TITLE => [$this, 'title'],
            self::ID => [$this, 'id'],
            self::ID_IN => [$this, 'id_in'],
            self::CONTENT => [$this, 'content'],
            self::CATEGORY_ID => [$this, 'categoryId'],
            self::STATUS => [$this, 'status'],
            self::STATUSES => [$this, 'statuses'],
            self::STATUS_IN => [$this, 'status_in'],
            self::STATUS_NOT => [$this, 'status_not'],
            self::NOT_FAV_DATE => [$this, 'not_fav_date'],
            self::VIP => [$this, 'vip'],
            self::ROLE => [$this, 'role'],
            self::ORDER_BY => [$this, 'order_by'],
            self::ORDER_BY_DESC => [$this, 'order_by_desc'],
            self::TARGETSEARCH => [$this, 'targetsearch'],
            self::LANGLOVE2 => [$this, 'langlove2'],
            self::LANGLOVE => [$this, 'langlove'],

        ];
    }

    public function id(Builder $builder, $value)
    {
        $builder->where('profiles.id', $value);
    }
    public function id_in(Builder $builder, $value)
    {
        $builder->whereIn('profiles.id', explode(',', $value));
    }
    public function title(Builder $builder, $value)
    {
        $builder->where('title', 'like', "%{$value}%");
    }

    public function targetsearch(Builder $builder, $value)
    {
        $builder->where('targetsearch', $value);
    }

    public function langlove2(Builder $builder, $value)
    {
        $builder->where('langlove2', $value);
    }

    public function langlove(Builder $builder, $value)
    {
        $builder->where('langlove', $value);
    }

    public function vip(Builder $builder, $value)
    {
        $builder->where('vip', $value);
    }

    public function role(Builder $builder, $value)
    {
        $builder->where('role', $value);
    }

    public function status(Builder $builder, $value)
    {
        $builder->where('status', $value);
    }

    public function status_in(Builder $builder, $value)
    {
        $builder->whereIn('status', explode(',', $value));
    }

    public function statuses(Builder $builder, $value)
    {
        $builder->whereIn('status', $value);
    }

    public function status_not(Builder $builder, $value)
    {
        $builder->whereNot('status', $value);
    }

    public function not_fav_date(Builder $builder, $value)
    {
        $builder->whereNot('fav_date', '');
    }


    public function content(Builder $builder, $value)
    {
        $builder->where('content', 'like', "%{$value}%");
    }

    public function categoryId(Builder $builder, $value)
    {
        $builder->where('category_id', $value);
    }

    public function order_by(Builder $builder, $value)
    {
        $builder->orderBy($value);
    }

    public function order_by_desc(Builder $builder, $value)
    {
        $builder->orderByDesc($value);
    }

}
